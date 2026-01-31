/**
 * @krisspy-file
 * @type page
 * @name "InventoryManagement"
 * @title "Inventory Management"
 * @description "Real-time material consumption tracking with sterilization status and expiration alerts"
 * @routes ["/mfa/inventory-management"]
 * @flowName "mfa-cockpit"
 * @layout "MFALayout"
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  Package,
  Clock,
  TrendingDown,
  Plus,
  QrCode,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Edit2,
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  sterilizationStatus: 'sterile' | 'used' | 'pending';
  expirationDate: string;
  lastUsed: string;
}

export default function InventoryManagement() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Sterile Gauze Pads (4x4)',
      category: 'Wound Care',
      quantity: 24,
      reorderLevel: 10,
      sterilizationStatus: 'sterile',
      expirationDate: '2025-06-15',
      lastUsed: '2 hours ago',
    },
    {
      id: '2',
      name: 'Surgical Gloves (Size M)',
      category: 'PPE',
      quantity: 5,
      reorderLevel: 20,
      sterilizationStatus: 'sterile',
      expirationDate: '2026-01-20',
      lastUsed: '1 hour ago',
    },
    {
      id: '3',
      name: 'Adhesive Bandages',
      category: 'Wound Care',
      quantity: 8,
      reorderLevel: 15,
      sterilizationStatus: 'pending',
      expirationDate: '2024-12-30',
      lastUsed: '5 days ago',
    },
    {
      id: '4',
      name: 'IV Cannula (18G)',
      category: 'IV Supplies',
      quantity: 12,
      reorderLevel: 10,
      sterilizationStatus: 'sterile',
      expirationDate: '2025-08-10',
      lastUsed: 'Not used',
    },
    {
      id: '5',
      name: 'Thermometer Covers',
      category: 'Diagnostic',
      quantity: 3,
      reorderLevel: 10,
      sterilizationStatus: 'used',
      expirationDate: '2024-11-15',
      lastUsed: '3 hours ago',
    },
  ]);

  const categories = ['all', 'Wound Care', 'PPE', 'IV Supplies', 'Diagnostic'];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const lowStockItems = filteredItems.filter((item) => item.quantity <= item.reorderLevel);
  const expiredItems = filteredItems.filter((item) => {
    const expiryDate = new Date(item.expirationDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  });
  const usedItems = filteredItems.filter((item) => item.sterilizationStatus === 'used');

  const getStatusBadge = (status: string, expiryDate: string) => {
    const expiryDateTime = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiryDateTime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return (
        <span className="px-3 py-1 bg-red-900 text-red-200 text-xs font-medium rounded-full flex items-center gap-1">
          <AlertCircle size={12} /> Abgelaufen
        </span>
      );
    }

    if (status === 'sterile') {
      return (
        <span className="px-3 py-1 bg-green-900 text-green-200 text-xs font-medium rounded-full flex items-center gap-1">
          <CheckCircle size={12} /> Steril
        </span>
      );
    }

    if (status === 'used') {
      return (
        <span className="px-3 py-1 bg-yellow-900 text-yellow-200 text-xs font-medium rounded-full flex items-center gap-1">
          <AlertTriangle size={12} /> Verwendet
        </span>
      );
    }

    return (
      <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full">
        Ausstehend
      </span>
    );
  };

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    if (quantity <= reorderLevel * 0.3) {
      return { color: 'text-red-400', bgColor: 'bg-red-900/20' };
    }
    if (quantity <= reorderLevel) {
      return { color: 'text-orange-400', bgColor: 'bg-orange-900/20' };
    }
    return { color: 'text-green-400', bgColor: 'bg-green-900/20' };
  };

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-sm">
            Bestandsverwaltung
          </h1>
          <p className="text-secondary text-sm">
            Echtzeitverfolgung von Materialverbrauch und Sterilisationsstatus
          </p>
        </div>
        <button className="flex items-center gap-md px-lg py-md bg-blue text-primary rounded-lg hover:bg-blue/80 transition-colors font-medium">
          <Plus size={20} /> Artikel hinzufügen
        </button>
      </div>

      {/* Alert Cards */}
      {(lowStockItems.length > 0 || expiredItems.length > 0 || usedItems.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
          {lowStockItems.length > 0 && (
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 border border-orange-700 rounded-lg p-md">
              <div className="flex items-center justify-between mb-sm">
                <h3 className="font-semibold text-orange-200 flex items-center gap-md">
                  <TrendingDown size={18} /> Niedriger Bestand
                </h3>
                <span className="bg-orange-900 text-orange-200 px-md py-xs rounded-full text-xs font-bold">
                  {lowStockItems.length}
                </span>
              </div>
              <ul className="space-y-xs text-sm text-orange-100">
                {lowStockItems.slice(0, 2).map((item) => (
                  <li key={item.id}>• {item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {expiredItems.length > 0 && (
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-700 rounded-lg p-md">
              <div className="flex items-center justify-between mb-sm">
                <h3 className="font-semibold text-red-200 flex items-center gap-md">
                  <AlertCircle size={18} /> Ablauf-Warnung
                </h3>
                <span className="bg-red-900 text-red-200 px-md py-xs rounded-full text-xs font-bold">
                  {expiredItems.length}
                </span>
              </div>
              <ul className="space-y-xs text-sm text-red-100">
                {expiredItems.slice(0, 2).map((item) => (
                  <li key={item.id}>• {item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {usedItems.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 border border-yellow-700 rounded-lg p-md">
              <div className="flex items-center justify-between mb-sm">
                <h3 className="font-semibold text-yellow-200 flex items-center gap-md">
                  <Clock size={18} /> Zur Sterilisierung
                </h3>
                <span className="bg-yellow-900 text-yellow-200 px-md py-xs rounded-full text-xs font-bold">
                  {usedItems.length}
                </span>
              </div>
              <ul className="space-y-xs text-sm text-yellow-100">
                {usedItems.slice(0, 2).map((item) => (
                  <li key={item.id}>• {item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <div className="bg-secondary border border-primary rounded-lg p-md">
          <div className="flex items-center justify-between mb-sm">
            <span className="text-secondary text-sm">Gesamtartikel</span>
            <Package size={18} className="text-blue" />
          </div>
          <p className="text-2xl font-bold text-primary">{filteredItems.length}</p>
        </div>

        <div className="bg-secondary border border-primary rounded-lg p-md">
          <div className="flex items-center justify-between mb-sm">
            <span className="text-secondary text-sm">Steril</span>
            <CheckCircle size={18} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-400">
            {filteredItems.filter((i) => i.sterilizationStatus === 'sterile').length}
          </p>
        </div>

        <div className="bg-secondary border border-primary rounded-lg p-md">
          <div className="flex items-center justify-between mb-sm">
            <span className="text-secondary text-sm">Zu sterilisieren</span>
            <AlertTriangle size={18} className="text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            {filteredItems.filter((i) => i.sterilizationStatus === 'used').length}
          </p>
        </div>

        <div className="bg-secondary border border-primary rounded-lg p-md">
          <div className="flex items-center justify-between mb-sm">
            <span className="text-secondary text-sm">Niedriger Bestand</span>
            <TrendingDown size={18} className="text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-orange-400">{lowStockItems.length}</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-md overflow-x-auto pb-md">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-lg py-md rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-blue text-primary'
                : 'bg-secondary border border-primary text-secondary hover:text-primary'
            }`}
          >
            {category === 'all' ? 'Alle' : category}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-secondary border border-primary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary bg-tertiary">
                <th className="px-lg py-md text-left font-semibold text-primary">
                  Artikel
                </th>
                <th className="px-lg py-md text-left font-semibold text-primary">
                  Kategorie
                </th>
                <th className="px-lg py-md text-center font-semibold text-primary">
                  Bestand
                </th>
                <th className="px-lg py-md text-left font-semibold text-primary">
                  Sterilisierung
                </th>
                <th className="px-lg py-md text-left font-semibold text-primary">
                  Ablauf
                </th>
                <th className="px-lg py-md text-left font-semibold text-primary">
                  Zuletzt verwendet
                </th>
                <th className="px-lg py-md text-center font-semibold text-primary">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.reorderLevel);
                return (
                  <tr key={item.id} className="border-b border-primary hover:bg-tertiary transition-colors">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-lg bg-blue/20 flex items-center justify-center">
                          <Package size={18} className="text-blue" />
                        </div>
                        <span className="font-medium text-primary">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-secondary">{item.category}</td>
                    <td className={`px-lg py-md text-center font-semibold ${stockStatus.color}`}>
                      <span className={`px-md py-xs rounded-lg ${stockStatus.bgColor}`}>
                        {item.quantity}/{item.reorderLevel}
                      </span>
                    </td>
                    <td className="px-lg py-md">
                      {getStatusBadge(item.sterilizationStatus, item.expirationDate)}
                    </td>
                    <td className="px-lg py-md text-secondary text-xs">{item.expirationDate}</td>
                    <td className="px-lg py-md text-secondary text-xs">{item.lastUsed}</td>
                    <td className="px-lg py-md text-center">
                      <div className="flex items-center justify-center gap-md">
                        <button className="p-sm hover:bg-tertiary rounded-lg transition-colors text-secondary hover:text-blue">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-sm hover:bg-tertiary rounded-lg transition-colors text-secondary hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <button className="flex items-center justify-center gap-md px-lg py-md bg-secondary border border-primary rounded-lg hover:bg-tertiary transition-colors text-primary font-medium">
          <QrCode size={20} /> Barcode scannen
        </button>
        <button className="flex items-center justify-center gap-md px-lg py-md bg-secondary border border-primary rounded-lg hover:bg-tertiary transition-colors text-primary font-medium">
          <Plus size={20} /> Verbrauch protokollieren
        </button>
      </div>
    </div>
  );
}
