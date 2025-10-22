'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2, Plus, Edit } from 'lucide-react';

const emptySection = () => ({
  id: Date.now().toString(),
  heading: '',
  content: [''],
  image: '',
  subsections: [],
});

const emptyFAQ = () => ({ question: '', answer: '' });
const emptyRelated = () => ({ title: '', description: '', link: '' });

export default function PageEditor() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [sections, setSections] = useState([emptySection()]);
  const [faqs, setFaqs] = useState([emptyFAQ()]);
  const [relatedTopics, setRelatedTopics] = useState([emptyRelated()]);
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Page list & editing
  const [pages, setPages] = useState<any[]>([]);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // Client-side token
  const [token, setToken] = useState<string | null>(null);

  // Fetch token from localStorage on client only
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || null);
  }, []);

  // Fetch all pages
  const fetchPages = async () => {
    if (!token) return; // Wait until token is set
    try {
      const res = await fetch(`${API}/api/pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPages(data.data.pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchPages();
  }, [token]);

  // ----- Section helpers -----
  const addSection = () => setSections([...sections, emptySection()]);
  const removeSection = (index: number) => setSections(sections.filter((_, i) => i !== index));
  const updateSection = (index: number, key: keyof ReturnType<typeof emptySection>, value: any) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };
  const addContentToSection = (sIdx: number) => {
    const updated = [...sections];
    updated[sIdx].content.push('');
    setSections(updated);
  };
  const updateContentInSection = (sIdx: number, cIdx: number, value: string) => {
    const updated = [...sections];
    updated[sIdx].content[cIdx] = value;
    setSections(updated);
  };
  const removeContentInSection = (sIdx: number, cIdx: number) => {
    const updated = [...sections];
    updated[sIdx].content.splice(cIdx, 1);
    setSections(updated);
  };

  // ----- FAQ helpers -----
  const addFAQ = () => setFaqs([...faqs, emptyFAQ()]);
  const removeFAQ = (idx: number) => setFaqs(faqs.filter((_, i) => i !== idx));
  const updateFAQ = (idx: number, key: keyof ReturnType<typeof emptyFAQ>, value: string) => {
    const updated = [...faqs];
    updated[idx][key] = value;
    setFaqs(updated);
  };

  // ----- Related Topics helpers -----
  const addRelated = () => setRelatedTopics([...relatedTopics, emptyRelated()]);
  const removeRelated = (idx: number) => setRelatedTopics(relatedTopics.filter((_, i) => i !== idx));
  const updateRelated = (idx: number, key: keyof ReturnType<typeof emptyRelated>, value: string) => {
    const updated = [...relatedTopics];
    updated[idx][key] = value;
    setRelatedTopics(updated);
  };

  // Load page for editing
  const loadPage = (page: any) => {
    setEditingPageId(page._id);
    setTitle(page.title || '');
    setSubtitle(page.subtitle || '');
    setHeroDescription(page.heroDescription || '');
    setSections(page.sections?.length ? page.sections : [emptySection()]);
    setFaqs(page.faq?.length ? page.faq : [emptyFAQ()]);
    setRelatedTopics(page.relatedTopics?.length ? page.relatedTopics : [emptyRelated()]);
    setStatus(page.status || 'draft');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete page
  const deletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/pages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchPages();
        alert('Page deleted');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete page');
    }
  };

  // Submit page
  const handleSubmit = async () => {
    if (!token) {
      alert('No token found. Please login again.');
      return;
    }
    setLoading(true);
    setError('');
    const payload = { title, subtitle, heroDescription, sections, faq: faqs, relatedTopics, status };

    try {
      let res;
      if (editingPageId) {
        res = await fetch(`${API}/api/pages/${editingPageId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API}/api/pages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok) {
        alert(`Page ${editingPageId ? 'updated' : 'created'} successfully`);
        fetchPages();
        setEditingPageId(null);
        setTitle('');
        setSubtitle('');
        setHeroDescription('');
        setSections([emptySection()]);
        setFaqs([emptyFAQ()]);
        setRelatedTopics([emptyRelated()]);
        setStatus('draft');
      } else {
        setError(data.message || 'Error submitting page');
      }
    } catch (err) {
      console.error(err);
      setError('Network error while submitting page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B132B] text-white font-['Inter',_sans-serif]">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-16 py-12 space-y-8">
        <h1 className="text-4xl font-bold mb-6">{editingPageId ? 'Edit Page' : 'Create New Page'}</h1>

        {error && <p className="text-red-500">{error}</p>}

        {/* Page Info */}
        <div className="space-y-4">
          <input type="text" placeholder="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-lg text-black" />
          <input type="text" placeholder="Page Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full p-3 rounded-lg text-black" />
          <textarea placeholder="Hero Description" value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} className="w-full p-3 rounded-lg text-black" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 rounded-lg text-black">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Sections</h2>
          {sections.map((section, idx) => (
            <div key={section.id} className="bg-white text-black p-4 rounded-lg space-y-2 shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Section {idx + 1}</h3>
                <button onClick={() => removeSection(idx)} className="text-red-600"><Trash2 /></button>
              </div>
              <input type="text" placeholder="Heading" value={section.heading} onChange={(e) => updateSection(idx, 'heading', e.target.value)} className="w-full p-2 rounded" />
              {section.content.map((para, cIdx) => (
                <div key={cIdx} className="flex gap-2 items-center mb-1">
                  <textarea value={para} onChange={(e) => updateContentInSection(idx, cIdx, e.target.value)} placeholder="Paragraph content" className="flex-1 p-2 rounded" />
                  <button onClick={() => removeContentInSection(idx, cIdx)} className="text-red-600"><Trash2 /></button>
                </div>
              ))}
              <button onClick={() => addContentToSection(idx)} className="flex items-center gap-2 text-[#00C896]"><Plus size={16} /> Add Paragraph</button>
              <input type="text" placeholder="Image URL" value={section.image} onChange={(e) => updateSection(idx, 'image', e.target.value)} className="w-full p-2 rounded mt-2" />
            </div>
          ))}
          <button onClick={addSection} className="flex items-center gap-2 text-[#00C896]"><Plus /> Add New Section</button>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">FAQs</h2>
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white text-black p-4 rounded shadow space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">FAQ {idx + 1}</h3>
                <button onClick={() => removeFAQ(idx)} className="text-red-600"><Trash2 /></button>
              </div>
              <input type="text" placeholder="Question" value={faq.question} onChange={(e) => updateFAQ(idx, 'question', e.target.value)} className="w-full p-2 rounded" />
              <textarea placeholder="Answer" value={faq.answer} onChange={(e) => updateFAQ(idx, 'answer', e.target.value)} className="w-full p-2 rounded" />
            </div>
          ))}
          <button onClick={addFAQ} className="flex items-center gap-2 text-[#00C896]"><Plus /> Add FAQ</button>
        </div>

        {/* Related Topics */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Related Topics</h2>
          {relatedTopics.map((topic, idx) => (
            <div key={idx} className="bg-white text-black p-4 rounded shadow space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Topic {idx + 1}</h3>
                <button onClick={() => removeRelated(idx)} className="text-red-600"><Trash2 /></button>
              </div>
              <input type="text" placeholder="Title" value={topic.title} onChange={(e) => updateRelated(idx, 'title', e.target.value)} className="w-full p-2 rounded" />
              <input type="text" placeholder="Description" value={topic.description} onChange={(e) => updateRelated(idx, 'description', e.target.value)} className="w-full p-2 rounded" />
              <input type="text" placeholder="Link URL" value={topic.link} onChange={(e) => updateRelated(idx, 'link', e.target.value)} className="w-full p-2 rounded" />
            </div>
          ))}
          <button onClick={addRelated} className="flex items-center gap-2 text-[#00C896]"><Plus /> Add Related Topic</button>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button onClick={handleSubmit} className="bg-[#00C896] text-black px-6 py-3 rounded-xl font-bold text-lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin inline-block mr-2" size={20} /> : editingPageId ? 'Update Page' : 'Create Page'}
          </button>
        </div>

        {/* List of Pages */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">All Pages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pages.map((page) => (
              <div key={page._id} className="bg-white text-black p-4 rounded-lg flex justify-between items-center shadow">
                <div>
                  <h3 className="font-bold">{page.title}</h3>
                  <p className="text-sm text-gray-600">{page.status}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => loadPage(page)} className="text-[#00C896] flex items-center gap-1"><Edit size={16} /> Edit</button>
                  <button onClick={() => deletePage(page._id)} className="text-red-600 flex items-center gap-1"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
