"use client";
// @ts-nocheck
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, X, Check } from "lucide-react";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false }) as any;
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false }) as any;
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false }) as any;
import { useMapEvents } from "react-leaflet";

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: any) { onPick(e.latlng.lat, e.latlng.lng); },
  });
  return null;
}

export default function MapPicker({
  open,
  lat,
  lng,
  onClose,
  onPick,
}: {
  open: boolean;
  lat: string;
  lng: string;
  onClose: () => void;
  onPick: (lat: number, lng: number, address?: string) => void;
}) {
  const [pos, setPos] = useState<[number, number]>([
    lat ? Number(lat) : -6.2,
    lng ? Number(lng) : 106.816,
  ]);
  const [addr, setAddr] = useState("");
  const [loadingAddr, setLoadingAddr] = useState(false);

  useEffect(() => {
    if (open) {
      import("leaflet/dist/leaflet.css");
      import("leaflet").then(L => {
        // @ts-ignore
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      });
      setPos([lat ? Number(lat) : -6.2, lng ? Number(lng) : 106.816]);
    }
  }, [open, lat, lng]);

  const handlePick = async (nlat: number, nlng: number) => {
    setPos([nlat, nlng]);
    setLoadingAddr(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${nlat}&lon=${nlng}&zoom=16`, { headers: { Accept: "application/json" } });
      const data = await res.json();
      setAddr(data.display_name || "");
    } catch { setAddr(""); } finally { setLoadingAddr(false); }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary"/> Pilih Titik di Peta</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-5 h-5"/></button>
        </div>
        <div className="h-[360px] w-full">
          <MapContainer center={pos} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
            <Marker position={pos} />
            <ClickHandler onPick={handlePick} />
          </MapContainer>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
          <p className="text-sm"><b>Lat:</b> {pos[0].toFixed(6)} <b>Lng:</b> {pos[1].toFixed(6)}</p>
          {addr && <p className="text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-200">{loadingAddr ? "Memuat alamat..." : addr}</p>}
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-slate-300 rounded-xl font-medium hover:bg-white">Batal</button>
            <button onClick={()=>{ onPick(pos[0], pos[1], addr); onClose(); }} className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover flex items-center justify-center gap-2"><Check className="w-5 h-5"/> Pilih Titik Ini</button>
          </div>
          <p className="text-xs text-slate-500 text-center">Klik di peta untuk pilih lokasi. Input manual lat/lng tetap bisa diisi.</p>
        </div>
      </div>
    </div>
  );
}
