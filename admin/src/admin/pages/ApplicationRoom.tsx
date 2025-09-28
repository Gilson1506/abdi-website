import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface NoteItem { id: string; text: string; createdAt: string; }
interface AttachItem { id: string; name: string; size: number; uploadedAt: string; }

const NOTES_KEY = (id: string) => `admin_app_room_notes_${id}`;
const FILES_KEY = (id: string) => `admin_app_room_files_${id}`;
const LINK_KEY = (id: string) => `admin_app_room_link_${id}`;

function load<T>(key: string, fallback: T): T { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } }
function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

export default function ApplicationRoom() {
  const { id } = useParams();
  const applicationId = id || 'unknown';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [notes, setNotes] = useState<NoteItem[]>(load<NoteItem[]>(NOTES_KEY(applicationId), []));
  const [files, setFiles] = useState<AttachItem[]>(load<AttachItem[]>(FILES_KEY(applicationId), []));
  const [meetingLink, setMeetingLink] = useState<string>(load<string>(LINK_KEY(applicationId), ''));
  const [noteText, setNoteText] = useState('');

  const addNote = () => {
    if (!noteText.trim()) return;
    const n: NoteItem = { id: String(Date.now()), text: noteText.trim(), createdAt: new Date().toISOString() };
    const next = [n, ...notes]; setNotes(next); save(NOTES_KEY(applicationId), next); setNoteText('');
  };

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const now = new Date().toISOString();
    const added: AttachItem[] = Array.from(list).map(f => ({ id: `${f.name}-${Date.now()}`, name: f.name, size: f.size, uploadedAt: now }));
    const next = [...added, ...files]; setFiles(next); save(FILES_KEY(applicationId), next);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (fid: string) => { const next = files.filter(f => f.id !== fid); setFiles(next); save(FILES_KEY(applicationId), next); };

  const saveLink = () => { save(LINK_KEY(applicationId), meetingLink); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Sala de Candidatura</h1>
      <p className="text-gray-600">ID: {applicationId}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-white p-4 space-y-3">
            <h2 className="text-lg font-medium text-gray-900">Notas</h2>
            <div className="flex gap-2">
              <input value={noteText} onChange={(e) => setNoteText(e.target.value)} className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Adicionar nota" />
              <button onClick={addNote} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Adicionar</button>
            </div>
            <div className="space-y-2">
              {notes.map(n => (
                <div key={n.id} className="rounded-md border p-3">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{n.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {notes.length === 0 && <p className="text-sm text-gray-500">Nenhuma nota</p>}
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Anexos</h2>
            <input ref={fileInputRef} type="file" multiple onChange={(e) => addFiles(e.target.files)} />
            <div className="mt-3 rounded-lg border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {files.map(f => (
                    <tr key={f.id}>
                      <td className="px-6 py-3 text-sm text-gray-900">{f.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">{(f.size/1024).toFixed(1)} KB</td>
                      <td className="px-6 py-3 text-sm text-gray-500">{new Date(f.uploadedAt).toLocaleString()}</td>
                      <td className="px-6 py-3 text-right text-sm"><button onClick={() => removeFile(f.id)} className="text-red-600 hover:text-red-800">Remover</button></td>
                    </tr>
                  ))}
                  {files.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-6 text-center text-sm text-gray-500">Nenhum anexo</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-4 space-y-3">
            <h2 className="text-lg font-medium text-gray-900">Link de Reunião</h2>
            <input value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="URL (Teams/Zoom/Meet)" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            <button onClick={saveLink} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Salvar link</button>
            {meetingLink && (
              <a href={meetingLink} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm text-blue-700 underline">Abrir reunião</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


