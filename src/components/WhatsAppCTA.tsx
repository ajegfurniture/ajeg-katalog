'use client';

import { MessageCircle, MapPin, Phone } from 'lucide-react';

interface WhatsAppCTAProps {
  productName: string;
}

export function WhatsAppCTA({ productName }: WhatsAppCTAProps) {
  const whatsappNumbers = {
    bekasi: '6287723466669', // Ganti dengan nomor WA Bekasi yang sebenarnya
    jogja: '6287839070444',  // Ganti dengan nomor WA Jogja yang sebenarnya
  };

  const generateWhatsAppMessage = (location: 'bekasi' | 'jogja') => {
    const locationName = location === 'bekasi' ? 'Bekasi' : 'Jogja';
    const productUrl = window.location.href;
    const message = `Halo, ka, aku tertarik dengan produk ini, minta infonya dong

Nama produk : *${productName}*
Link produk : ${productUrl}

Cabang ${locationName}`;
    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = (location: 'bekasi' | 'jogja') => {
    const number = whatsappNumbers[location];
    const message = generateWhatsAppMessage(location);
    const whatsappUrl = `https://wa.me/${number}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white p-4 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Tertarik dengan produk ini?
        </h3>
        <p className="text-gray-600 text-sm">
          Hubungi kami melalui WhatsApp untuk informasi lebih lanjut
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Bekasi CTA */}
        <button
          onClick={() => handleWhatsAppClick('bekasi')}
          className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-full">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">WhatsApp Bekasi</div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Cabang Bekasi
              </div>
            </div>
          </div>
          <div className="text-green-600 group-hover:text-green-700">
            <Phone className="w-5 h-5" />
          </div>
        </button>

        {/* Jogja CTA */}
        <button
          onClick={() => handleWhatsAppClick('jogja')}
          className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-full">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">WhatsApp Jogja</div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Cabang Jogja
              </div>
            </div>
          </div>
          <div className="text-blue-600 group-hover:text-blue-700">
            <Phone className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Additional Info */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>Respon dalam 5 menit</p>
        <p>Gratis konsultasi sepuasnya</p>
        <p>Menerima kartu kredit</p>
      </div>
    </div>
  );
}
