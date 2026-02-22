import React, { useState, useEffect } from 'react';
import api from '../api/apiClient';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function TemplateManager() {
    const [templates, setTemplates] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await api.get('/admin/templates');
            setTemplates(response.data);
        } catch (error) {
            console.error('Failed to fetch templates', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            try {
                await api.delete(`/admin/templates/${id}`);
                fetchTemplates();
            } catch (error) {
                console.error('Failed to delete template', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Notification Templates</h3>
                <button
                    onClick={() => { setCurrentTemplate(null); setShowForm(true); }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                    <Plus size={18} /> Add Template
                </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden text-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-700/50 border-b border-gray-700 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="py-3 px-4">Code</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Channel</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {templates.map((tpl) => (
                            <tr key={tpl.id} className="hover:bg-gray-700/30">
                                <td className="py-4 px-4 font-mono text-blue-400">{tpl.code}</td>
                                <td className="py-4 px-4">{tpl.name}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${tpl.channel === 'EMAIL' ? 'bg-blue-900/40 text-blue-400 border border-blue-500/30' :
                                            tpl.channel === 'SMS' ? 'bg-orange-900/40 text-orange-400 border border-orange-500/30' :
                                                'bg-green-900/40 text-green-400 border border-green-500/30'
                                        }`}>
                                        {tpl.channel}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right space-x-2">
                                    <button onClick={() => { setCurrentTemplate(tpl); setShowForm(true); }} className="text-gray-400 hover:text-white p-1">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(tpl.id)} className="text-red-400/70 hover:text-red-400 p-1">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <TemplateForm
                    template={currentTemplate}
                    onClose={() => setShowForm(false)}
                    onSave={() => { setShowForm(false); fetchTemplates(); }}
                />
            )}
        </div>
    );
}

function TemplateForm({ template, onClose, onSave }) {
    const [formData, setFormData] = useState(template || {
        code: '', name: '', channel: 'EMAIL', content: '', subject: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (template?.id) {
                await api.put(`/admin/templates/${template.id}`, formData);
            } else {
                await api.post('/admin/templates', formData);
            }
            onSave();
        } catch (error) {
            console.error('Failed to save template', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <h4 className="text-2xl font-semibold">{template ? 'Edit' : 'New'} Template</h4>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase">Template Code</label>
                            <input
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                                placeholder="USER_WELCOME"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase">Channel</label>
                            <select
                                value={formData.channel}
                                onChange={e => setFormData({ ...formData, channel: e.target.value })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="EMAIL">Email</option>
                                <option value="SMS">SMS</option>
                                <option value="WHATSAPP">WhatsApp</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase">Template Name</label>
                        <input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Welcome Email for New Users"
                        />
                    </div>

                    {formData.channel === 'EMAIL' && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                            <label className="text-xs text-gray-400 uppercase">Email Subject</label>
                            <input
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                                placeholder="Welcome to our platform!"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase">Content (Supports Thymeleaf/HTML)</label>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 h-40 font-mono"
                            placeholder="<h1>Hello [(${name})]!</h1>"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
                            Save Template
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
