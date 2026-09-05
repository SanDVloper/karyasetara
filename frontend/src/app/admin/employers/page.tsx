"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Building, Search, ArrowLeft, Ban, ShieldCheck, MapPin, Briefcase, Loader2, AlertCircle } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import { getApiUrl } from "@/lib/api";

export default function AdminEmployersPage() {
  const [confirmEmp, setConfirmEmp] = useState<any|null>(null);
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [q, setQ] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const apiUrl = getApiUrl();
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("auth_token") || localStorage.getItem("token") : null;

  const fetchEmployers = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${apiUrl}/api/admin/users?role=employer`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memuat employer");
      const list = Array.isArray(data) ? data : data.data || [];
      setEmployers(list);
    } catch (e:any) { setError(e.message); } finally { setLoading(false); }
  };
  useEffect(() => { fetchEmployers(); }, []);

  const handleSuspend = async () => {
    if (!confirmEmp) return;
    setConfirmLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${apiUrl}/api/admin/users/${confirmEmp.id}/suspend`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ is_suspended: !confirmEmp.is_suspended }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal");
      setConfirmEmp(null);
      fetchEmployers();
    } catch (e:any) { setError(e.message); } finally { setConfirmLoading(false); }
  };

  const filtered = employers.filter(e => !q || e.name?.toLowerCase().includes(q.toLowerCase()) || e.email?.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 hover:bg-slate-800 rounded-full"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Building className="w-6 h-6 text-blue-400" /> Employer — Manajemen Akun</h1>
        </div>
        <p className="text-sm text-slate-400 -mt-4 ml-11">PAGE.txt: Admin / Employer — moderasi akun employer (UC-15: Nonaktifkan Akun Employer).</p>

        {error && <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}
        {loading && <div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-white"/></div>}

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari perusahaan atau email..." className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500" />
          </div>
          <span className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-400">{filtered.length} employer</span>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Perusahaan</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4">Lowongan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-700/40">
                    <td className="py-4 px-4 font-mono text-slate-400">#{e.id}</td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-white flex items-center gap-2"><Building className="w-4 h-4 text-slate-500" /> {e.name}</p>
                      <p className="text-xs text-slate-400">{e.email}</p>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.address?.slice(0,30) || `${e.latitude||"-"}, ${e.longitude||"-"}`}</td>
                    <td className="py-4 px-4 flex items-center gap-1"><Briefcase className="w-4 h-4 text-slate-500" /> {e.jobs_count ?? "-"}</td>
                    <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${e.is_suspended ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-green-500/20 text-green-300 border-green-500/30"}`}>{e.is_suspended ? "Nonaktif" : "Aktif"}</span></td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs border border-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-700 inline-flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Detail</button>
                        <button onClick={()=>setConfirmEmp(e)} className={`text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1 ${e.is_suspended ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"}`}><Ban className="w-3 h-3" /> {e.is_suspended ? "Aktifkan" : "Nonaktifkan"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmModal open={!!confirmEmp} title={confirmEmp?.is_suspended ? "Aktifkan employer?" : "Nonaktifkan employer?"} description={confirmEmp ? (confirmEmp.is_suspended ? `Aktifkan "${confirmEmp.name}"? Akun bisa login kembali.` : `Nonaktifkan "${confirmEmp.name}" (${confirmEmp.email})? Akun tidak bisa login & lowongannya akan terdampak.`) : ""} confirmText={confirmEmp?.is_suspended ? "Ya, Aktifkan" : "Ya, Nonaktifkan"} variant={confirmEmp?.is_suspended ? "success" : "danger"} loading={confirmLoading} onConfirm={handleSuspend} onClose={()=>setConfirmEmp(null)} />
    </div>
  );
}
