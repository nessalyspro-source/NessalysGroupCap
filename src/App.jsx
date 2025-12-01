import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  Receipt,
  BarChart3,
  Ticket,
  Settings,
  User,
  Plus,
  Users,
  FileText,
  AlertCircle,
  TrendingUp,
  Search,
  Bell,
  Menu,
  X,
  Briefcase,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Download,
  Send,
  Calendar,
  Trash2,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  PieChart as PieChartIcon,
  MessageSquare,
  Filter,
  MoreHorizontal,
  Paperclip,
  Check,
  XCircle,
  Phone,
  Mail,
  LogOut,
  HelpCircle,
  UploadCloud,
  MapPin,
  Hash,
  Smartphone
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// --- Données simulées (Mock Data) ---

const MOCK_REVENUE_DATA = [
  { name: 'Jan', ca: 4000, admin: 1200 },
  { name: 'Fév', ca: 3000, admin: 1500 },
  { name: 'Mar', ca: 5000, admin: 1800 },
  { name: 'Avr', ca: 4500, admin: 2200 },
  { name: 'Mai', ca: 6000, admin: 2600 },
  { name: 'Juin', ca: 7500, admin: 3100 },
];

const MOCK_STATS_GROWTH = [
  { month: 'Jan', contrats: 40, cible: 35 },
  { month: 'Fév', contrats: 50, cible: 45 },
  { month: 'Mar', contrats: 60, cible: 55 },
  { month: 'Avr', contrats: 73, cible: 65 },
  { month: 'Mai', contrats: 86, cible: 75 },
  { month: 'Juin', contrats: 103, cible: 90 },
];

const MOCK_COMPANIES = [
  {
    id: 1,
    reference: 'NG-SCT-2024-001',
    name: 'TechFlow Solutions',
    address: '12 Rue de l\'Innovation, 75011 Paris',
    contact: 'Jean Dupont',
    email: 'contact@techflow.io',
    phone: '01 23 45 67 89',
    logo: 'TF',
    color: 'bg-[#2a403d]', // Vert profond
    contracts: 12,
    employees: 45,
    monthlyRevenueHT: 15000,
    status: 'Active'
  },
  {
    id: 2,
    reference: 'NG-SCT-2024-002',
    name: 'Green Energy Corp',
    address: '45 Avenue Eco, 69002 Lyon',
    contact: 'Sophie Martin',
    email: 's.martin@greenenergy.com',
    phone: '04 78 90 12 34',
    logo: 'GE',
    color: 'bg-[#4a5d58]', // Vert sauge foncé
    contracts: 8,
    employees: 22,
    monthlyRevenueHT: 8500,
    status: 'Active'
  },
  {
    id: 3,
    reference: 'NG-SCT-2024-003',
    name: 'Urban Logistics',
    address: 'Zone Industrielle Nord, 13015 Marseille',
    contact: 'Marc Alvear',
    email: 'logistics@urban.fr',
    phone: '06 11 22 33 44',
    logo: 'UL',
    color: 'bg-[#8c867a]', // Taupe
    contracts: 25,
    employees: 110,
    monthlyRevenueHT: 42000,
    status: 'Active'
  },
  {
    id: 4,
    reference: 'NG-SCT-2024-004',
    name: 'Nessaly Design',
    address: '8 Boulevard des Arts, 33000 Bordeaux',
    contact: 'Sarah Arts',
    email: 'hello@nessaly.design',
    phone: '05 56 77 88 99',
    logo: 'ND',
    color: 'bg-[#5c5666]', // Gris violet sourd
    contracts: 3,
    employees: 5,
    monthlyRevenueHT: 3200,
    status: 'Pending'
  },
  {
    id: 5,
    reference: 'NG-SCT-2024-005',
    name: 'Alpha Construction',
    address: '99 Route du BTP, 59000 Lille',
    contact: 'Pierre Betton',
    email: 'p.betton@alpha.co',
    phone: '03 20 12 34 56',
    logo: 'AC',
    color: 'bg-[#3d3d3d]', // Gris anthracite
    contracts: 15,
    employees: 60,
    monthlyRevenueHT: 28000,
    status: 'Active'
  }
];

const MOCK_TICKETS = [
  {
    id: 'T-2024-001',
    companyId: 1,
    subject: "Problème connexion API",
    status: "Open",
    priority: "High",
    lastUpdate: "Il y a 2h",
    messages: [
      { id: 1, sender: "Jean Dupont", role: "client", text: "Bonjour, nous rencontrons des erreurs 500 sur l\'API de synchronisation depuis ce matin. C\'est bloquant pour notre production.", time: "10:30" },
      { id: 2, sender: "Support Admin", role: "admin", text: "Bonjour Jean, nous avons bien reçu votre alerte. Notre équipe technique investigue sur le serveur de production.", time: "10:45" },
    ]
  },
  {
    id: 'T-2024-002',
    companyId: 2,
    subject: "Question facture Juin",
    status: "Pending",
    priority: "Medium",
    lastUpdate: "Hier",
    messages: [
      { id: 1, sender: "Sophie Martin", role: "client", text: "Pouvez-vous me confirmer que la remise commerciale a bien été appliquée sur la dernière facture ?", time: "Hier, 14:20" },
    ]
  },
  {
    id: 'T-2024-003',
    companyId: 3,
    subject: "Ajout nouvel utilisateur",
    status: "New",
    priority: "Low",
    lastUpdate: "Il y a 5 min",
    messages: [
      { id: 1, sender: "Marc Alvear", role: "client", text: "Merci de créer un accès administrateur pour notre nouveau DAF, M. Bernard.", time: "11:55" },
    ]
  },
];

// Palette de couleurs "Raffinée & Nature" pour les graphiques
const MOCK_DISTRIBUTION_DATA = MOCK_COMPANIES
  .filter(c => c.status === 'Active')
  .map(c => ({
    name: c.name,
    value: c.contracts * 29.99
  }))
  .sort((a, b) => b.value - a.value);

// Nuances de verts sourds, sauge, taupe et beige
const COLORS = ['#2a403d', '#4a5d58', '#738276', '#a5b4ac', '#c8cfca'];

const MOCK_INVOICES = [
  { id: 101, ref: 'NG-FAC-2024-042', company: 'TechFlow Solutions', date: '2024-06-01', amount: 359.88, status: 'Paid' },
  { id: 102, ref: 'NG-FAC-2024-043', company: 'Green Energy Corp', date: '2024-06-02', amount: 239.92, status: 'Pending' },
  { id: 103, ref: 'NG-FAC-2024-044', company: 'Urban Logistics', date: '2024-06-05', amount: 749.75, status: 'Overdue' },
  { id: 104, ref: 'NG-FAC-2024-045', company: 'Alpha Construction', date: '2024-06-10', amount: 449.85, status: 'Paid' },
];

const MOCK_ALERTS = [
  { id: 1, type: 'ticket', message: 'Ticket critique ouvert par TechFlow', time: 'Il y a 2h' },
  { id: 2, type: 'payment', message: 'Facture #4022 en attente (Urban Logistics)', time: 'Il y a 5h' },
  { id: 3, type: 'ticket', message: 'Demande de support niveau 1', time: 'Hier' },
];

// --- Composants Utilitaires ---

const formatCurrency = (value) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: 'bg-[#edf2f0] text-[#2a403d] border-[#d1dbd8]',
    Pending: 'bg-[#fff8eb] text-[#8c6b45] border-[#f0e6d5]',
    Overdue: 'bg-[#fdf2f2] text-[#8a3c3c] border-[#f2dede]',
    Active: 'bg-[#edf2f0] text-[#2a403d] border-[#d1dbd8]',
    Inactive: 'bg-[#f5f5f4] text-[#78716c] border-[#e7e5e4]',
    Open: 'bg-[#f0f5f9] text-[#456b8c] border-[#d5e1f0]',
    New: 'bg-[#edf2f0] text-[#2a403d] border-[#d1dbd8]',
    Resolved: 'bg-[#f5f5f4] text-[#78716c] border-[#e7e5e4]'
  };
  
  const labels = {
    Paid: 'Payée',
    Pending: 'En attente',
    Overdue: 'En retard',
    Active: 'Actif',
    Inactive: 'Inactif',
    Open: 'Ouvert',
    New: 'Nouveau',
    Resolved: 'Résolu'
  };

  return (
    <span className={`px-3 py-1 rounded-sm text-[11px] font-medium border tracking-wide uppercase ${styles[status] || styles.Inactive}`}>
      {labels[status] || status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-[#fdf2f2] text-[#8a3c3c] border-[#f2dede]',
    Medium: 'bg-[#fff8eb] text-[#8c6b45] border-[#f0e6d5]',
    Low: 'bg-[#edf2f0] text-[#2a403d] border-[#d1dbd8]',
  };
  
  const labels = {
    High: 'Haute',
    Medium: 'Moyenne',
    Low: 'Basse',
  };

  return (
    <span className={`px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold tracking-wider border ${styles[priority] || styles.Low}`}>
      {labels[priority] || priority}
    </span>
  );
};

// Carte statistique "Raffinée"
const StatCard = ({ title, value, subtext, icon: Icon, trend, alert }) => (
  <div className="bg-white p-6 rounded-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-[#f0f0f0] flex flex-col justify-between hover:border-[#d1dbd8] transition-colors duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-2.5 rounded-md transition-colors duration-300 ${alert ? 'bg-[#fdf2f2] text-[#8a3c3c]' : 'bg-[#f5f7f6] text-[#5c6e69] group-hover:bg-[#2a403d] group-hover:text-white'}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      {trend && (
        <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trend.includes('+') ? 'text-[#2a403d] bg-[#edf2f0]' : 'text-[#8a3c3c] bg-[#fdf2f2]'}`}>
          {trend.includes('+') ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-[#8c867a] text-[11px] font-bold uppercase tracking-widest mb-2">{title}</h3>
      <p className="text-3xl font-light text-[#1a1a1a] tracking-tight">{value}</p>
      {subtext && <p className="text-xs text-[#a8a29e] mt-2 font-medium">{subtext}</p>}
    </div>
  </div>
);

// --- Composant Tiroir de Création de Société (Create Company Drawer) ---

const CreateCompanyDrawer = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    siret: '',
    address: '',
    contactRole: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const nextRef = `NG-SCT-${new Date().getFullYear()}-${String(MOCK_COMPANIES.length + 1).padStart(3, '0')}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#0f1412]/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-[#fdfdfc] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.2, 0, 0, 1) flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-8 py-6 border-b border-[#f0f0f0] flex justify-between items-center bg-white shrink-0">
          <div>
            <h2 className="text-2xl font-light text-[#1a1a1a] flex items-center gap-3">
              <span className="p-2 bg-[#edf2f0] rounded-sm text-[#2a403d]"><Building2 className="w-5 h-5" /></span>
              Nouvelle Société
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f5f5f4] rounded-full transition-colors text-[#a8a29e] hover:text-[#57534e]">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fafaf9]">
          
          {/* Section 1: Identité Société */}
          <section className="bg-white p-8 rounded-sm shadow-sm border border-[#f0f0f0]">
             <h3 className="text-xs font-bold text-[#a8a29e] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Building2 size={14} /> Identité de l\'entreprise
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-20 h-20 bg-[#f5f5f4] border-2 border-dashed border-[#e7e5e4] rounded-sm flex flex-col items-center justify-center text-[#a8a29e] cursor-pointer hover:border-[#2a403d] hover:text-[#2a403d] transition-colors">
                  <UploadCloud size={20} strokeWidth={1.5} />
                  <span className="text-[10px] mt-1 font-medium">Logo</span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Nom de la société</label>
                  <input type="text" name="name" placeholder="Ex: Nessaly\'S Group" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all placeholder-[#d6d3d1]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase flex items-center gap-1"><Hash size={12}/> SIRET</label>
                  <input type="text" name="siret" placeholder="123 456 789 00012" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all placeholder-[#d6d3d1]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase flex items-center gap-1"><Target size={12}/> Référence (Auto)</label>
                  <input type="text" value={nextRef} disabled className="w-full bg-[#f5f5f4] border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm font-mono text-[#44403c] cursor-not-allowed" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase flex items-center gap-1"><MapPin size={12}/> Adresse Complète</label>
                <input type="text" name="address" placeholder="12 Avenue des Champs-Élysées, 75008 Paris" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all placeholder-[#d6d3d1]" />
              </div>
            </div>
          </section>

          {/* Section 2: Contact Principal */}
          <section className="bg-white p-8 rounded-sm shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xs font-bold text-[#a8a29e] uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={14} /> Représentant & Accès
            </h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Fonction</label>
                  <select name="contactRole" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-shadow bg-white text-[#44403c]">
                    <option value="">-- Sélectionner --</option>
                    <option value="president">Président</option>
                    <option value="dg">Directeur Général</option>
                    <option value="gerant">Gérant</option>
                    <option value="representant">Représentant Légal</option>
                    <option value="admin">Responsable Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Nom & Prénom</label>
                  <input type="text" name="contactName" placeholder="Jean Dupont" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all placeholder-[#d6d3d1]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase flex items-center gap-1"><Smartphone size={12}/> Téléphone</label>
                  <input type="tel" name="contactPhone" placeholder="06 12 34 56 78" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all placeholder-[#d6d3d1]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase flex items-center gap-1"><Mail size={12}/> Email (Connexion)</label>
                  <input type="email" name="contactEmail" placeholder="contact@societe.com" className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all placeholder-[#d6d3d1]" />
                </div>
              </div>
              
              <div className="p-4 bg-[#edf2f0]/50 rounded-sm border border-[#e7e5e4] text-xs text-[#57534e] flex gap-2">
                <div className="mt-0.5 text-[#2a403d]"><CheckCircle2 size={14} /></div>
                <p>La référence <strong>{nextRef}</strong> servira d\'identifiant pour la première connexion du client, couplée à l\'adresse email renseignée.</p>
              </div>
            </div>
          </section>

        </div>

        <div className="p-8 border-t border-[#f0f0f0] bg-white flex justify-end space-x-4 shrink-0">
          <button onClick={onClose} className="px-6 py-3 text-[#78716c] font-semibold hover:bg-[#fafaf9] rounded-sm transition-colors">
            Annuler
          </button>
          <button className="px-8 py-3 bg-[#2a403d] hover:bg-[#1a2624] text-white font-medium rounded-sm shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5">
            <Check size={18} />
            Créer la société
          </button>
        </div>
      </div>
    </>
  );
};

// --- Composant Tiroir de Facturation (Billing Drawer) ---

const CreateInvoiceDrawer = ({ isOpen, onClose }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  
  const [items, setItems] = useState([]);
  const [vatRate, setVatRate] = useState(20);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notes, setNotes] = useState('Paiement à réception. Merci de votre confiance.');

  useEffect(() => {
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + 30);
    setDueDate(date.toISOString().split('T')[0]);
  }, [invoiceDate]);

  useEffect(() => {
    if (selectedCompanyId) {
      const company = MOCK_COMPANIES.find(c => c.id === parseInt(selectedCompanyId));
      if (company) {
        setItems([{ id: Date.now(), description: `Abonnement Mensuel - Gestion (${company.contracts} contrats)`, quantity: company.contracts, unitPrice: 29.99 }]);
      }
    } else {
      setItems([]);
    }
  }, [selectedCompanyId]);

  const selectedCompany = MOCK_COMPANIES.find(c => c.id === parseInt(selectedCompanyId));
  const nextRef = `NG-FAC-2024-${String(MOCK_INVOICES.length + 1).padStart(3, '0')}`;

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotalHT = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const discountAmount = subtotalHT * (discountPercent / 100);
  const discountedHT = subtotalHT - discountAmount;
  const vatAmount = discountedHT * (vatRate / 100);
  const totalTTC = discountedHT + vatAmount;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#0f1412]/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 right-0 z-50 w-full md:w-[700px] bg-[#fdfdfc] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.2, 0, 0, 1) flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-8 py-6 border-b border-[#f0f0f0] flex justify-between items-center bg-white shrink-0">
          <div>
            <h2 className="text-2xl font-light text-[#1a1a1a] flex items-center gap-3">
              <span className="p-2 bg-[#edf2f0] rounded-sm text-[#2a403d]"><Plus className="w-5 h-5" /></span>
              Nouvelle Facture
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f5f5f4] rounded-full transition-colors text-[#a8a29e] hover:text-[#57534e]">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fafaf9]">
          <section className="bg-white p-8 rounded-sm shadow-sm border border-[#f0f0f0]">
             <h3 className="text-xs font-bold text-[#a8a29e] uppercase tracking-widest mb-6 flex items-center gap-2">
              <FileText size={14} /> Détails Généraux
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Référence</label>
                <input type="text" value={nextRef} disabled className="w-full bg-[#f5f5f4] border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm font-mono text-[#44403c]" />
              </div>
              <div>
                 <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Émission</label>
                 <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all" />
              </div>
              <div>
                 <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Échéance</label>
                 <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-all" />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-sm shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xs font-bold text-[#a8a29e] uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={14} /> Client
            </h3>
            <select 
              className="w-full border border-[#e7e5e4] rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none transition-shadow bg-white text-[#44403c]"
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
            >
              <option value="">-- Sélectionner un client --</option>
              {MOCK_COMPANIES.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.reference})</option>
              ))}
            </select>
             {selectedCompany && (
                <div className="bg-[#edf2f0]/60 border border-[#d1dbd8] rounded-sm p-5 mt-4 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold text-[#2a403d] block">{selectedCompany.name}</span>
                    <span className="text-[#5c6e69] text-xs block mt-1">{selectedCompany.address}</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-sm text-xs text-[#2a403d] font-medium shadow-sm border border-[#e7e5e4]">
                    TVA Intra: FR123456789
                  </div>
                </div>
              )}
          </section>

          <section className="bg-white p-8 rounded-sm shadow-sm border border-[#f0f0f0]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-[#a8a29e] uppercase tracking-widest flex items-center gap-2">
                <Receipt size={14} /> Prestations
              </h3>
              <button onClick={addItem} className="text-xs flex items-center text-[#2a403d] hover:text-[#1a2624] font-bold bg-[#edf2f0] hover:bg-[#dce6e3] px-4 py-2 rounded-sm transition-colors">
                <Plus size={14} className="mr-1.5" /> Ajouter
              </button>
            </div>
            
            <div className="border border-[#f0f0f0] rounded-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#fafaf9] text-[#78716c] font-semibold border-b border-[#f0f0f0]">
                  <tr>
                    <th className="px-4 py-3 w-1/2">Description</th>
                    <th className="px-4 py-3 w-20 text-center">Qté</th>
                    <th className="px-4 py-3 w-28 text-right">Prix Unit.</th>
                    <th className="px-4 py-3 w-28 text-right">Total HT</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f4]">
                  {items.length > 0 ? items.map((item) => (
                    <tr key={item.id} className="bg-white group hover:bg-[#fafaf9] transition-colors">
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Description du service..."
                          className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm text-[#44403c] placeholder-[#a8a29e] font-medium"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full bg-[#f5f5f4] rounded-sm border-none focus:ring-1 focus:ring-[#2a403d] p-1.5 text-center text-sm font-medium"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full bg-[#f5f5f4] rounded-sm border-none focus:ring-1 focus:ring-[#2a403d] p-1.5 text-right text-sm font-medium"
                        />
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-[#2a403d]">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => removeItem(item.id)} className="text-[#d6d3d1] hover:text-red-500 transition-colors">
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-[#a8a29e] italic">
                        Aucune ligne. Cliquez sur "Ajouter" ou sélectionnez un client.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col sm:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#57534e] mb-2 uppercase">Conditions & Notes</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-32 border border-[#e7e5e4] rounded-sm p-4 text-sm focus:ring-1 focus:ring-[#2a403d] focus:border-[#2a403d] outline-none resize-none bg-white text-[#57534e] shadow-sm"
                  placeholder="Notes visibles sur la facture..."
                />
              </div>
            </div>

            <div className="w-full sm:w-80 bg-[#1a2624] rounded-sm p-6 space-y-4 text-[#d6d3d1] shadow-xl shadow-[#1a2624]/10">
              <div className="flex justify-between items-center text-sm">
                <span>Total HT Brut</span>
                <span className="text-[#f5f5f4] font-medium">{formatCurrency(subtotalHT)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span>Remise (%)</span>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={discountPercent} 
                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                    className="w-12 bg-[#2d403c] border-none rounded-sm text-center text-xs text-white focus:ring-1 focus:ring-[#738276]"
                  />
                </div>
                <span className="text-[#a5b4ac] font-medium">- {formatCurrency(discountAmount)}</span>
              </div>

              <div className="flex justify-between items-center text-sm pt-2 border-t border-[#2d403c]">
                <span>Net HT</span>
                <span className="text-[#f5f5f4] font-medium">{formatCurrency(discountedHT)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span>TVA (%)</span>
                  <select 
                    value={vatRate} 
                    onChange={(e) => setVatRate(parseFloat(e.target.value))}
                    className="w-14 bg-[#2d403c] border-none rounded-sm text-xs text-white focus:ring-1 focus:ring-[#738276]"
                  >
                    <option value="20">20</option>
                    <option value="10">10</option>
                    <option value="5.5">5.5</option>
                    <option value="0">0</option>
                  </select>
                </div>
                <span className="text-[#f5f5f4] font-medium">{formatCurrency(vatAmount)}</span>
              </div>

              <div className="pt-4 border-t border-[#4a5d58] mt-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#738276]">Net à payer</span>
                  <p className="text-2xl font-light text-white">{formatCurrency(totalTTC)}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="p-8 border-t border-[#f0f0f0] bg-white flex justify-end space-x-4 shrink-0">
          <button onClick={onClose} className="px-6 py-3 text-[#78716c] font-semibold hover:bg-[#fafaf9] rounded-sm transition-colors">
            Annuler
          </button>
          <button className="px-8 py-3 bg-[#2a403d] hover:bg-[#1a2624] text-white font-medium rounded-sm shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5">
            <CheckCircle2 size={18} />
            Valider la facture
          </button>
        </div>
      </div>
    </>
  );
};

// --- Vues Principales ---

const StatsView = () => {
  const totalContracts = MOCK_COMPANIES.reduce((acc, curr) => acc + curr.contracts, 0);
  const mrr = totalContracts * 29.99;
  const arr = mrr * 12;
  const activeClients = MOCK_COMPANIES.filter(c => c.status === 'Active').length;
  const arpu = activeClients > 0 ? mrr / activeClients : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light text-[#1a1a1a] tracking-tight">Statistiques</h2>
          <p className="text-[#78716c] mt-1">Performance financière et commerciale.</p>
        </div>
        <div className="flex items-center bg-white border border-[#e7e5e4] rounded-sm p-1 shadow-sm">
          <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#f5f5f4] text-[#44403c] rounded-sm shadow-sm">Mois</button>
          <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#a8a29e] hover:text-[#57534e] transition-colors">Trimestre</button>
          <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#a8a29e] hover:text-[#57534e] transition-colors">Année</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="MRR (Mensuel)" 
          value={formatCurrency(mrr)} 
          subtext="Objectif: 3 000,00 €"
          icon={Activity} 
          trend="+18.2%"
        />
        <StatCard 
          title="ARR (Annuel)" 
          value={formatCurrency(arr)} 
          subtext="Projection fin d\'année"
          icon={TrendingUp} 
          trend="+12.5%"
        />
        <StatCard 
          title="Panier Moyen" 
          value={formatCurrency(arpu)} 
          subtext="Par société active"
          icon={PieChartIcon} 
          trend="+5.3%"
        />
        <StatCard 
          title="Total Contrats" 
          value={totalContracts} 
          subtext="+8 ce mois-ci"
          icon={Target} 
          trend="+9.4%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-medium text-[#44403c]">Croissance des Contrats</h3>
            <div className="flex items-center space-x-6 text-xs font-medium uppercase tracking-wider">
              <span className="flex items-center text-[#78716c]"><div className="w-2 h-2 rounded-full bg-[#2a403d] mr-2"></div>Réalisé</span>
              <span className="flex items-center text-[#a8a29e]"><div className="w-2 h-2 rounded-full bg-[#e7e5e4] mr-2"></div>Objectif</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_STATS_GROWTH} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#fafaf9'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                />
                <Bar dataKey="cible" fill="#e7e5e4" radius={[2, 2, 0, 0]} />
                <Bar dataKey="contrats" fill="#2a403d" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0] flex flex-col">
          <h3 className="text-lg font-medium text-[#44403c] mb-2">Répartition du CA</h3>
          <p className="text-xs text-[#a8a29e] mb-6">Contribution par société.</p>
          <div className="flex-1 min-h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {MOCK_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} itemStyle={{color: '#444'}} />
                <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{fontSize: '11px', color: '#78716c'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
              <span className="block text-3xl font-light text-[#1a1a1a]">{activeClients}</span>
              <span className="text-[10px] text-[#a8a29e] uppercase tracking-widest font-bold">Clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketsView = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (!selectedTicketId && MOCK_TICKETS.length > 0 && window.innerWidth >= 1024) {
      setSelectedTicketId(MOCK_TICKETS[0].id);
    }
  }, []);

  const filteredTickets = MOCK_TICKETS.filter(t => {
    const matchesFilter = filter === 'All' ? true : t.status === filter;
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedTicket = MOCK_TICKETS.find(t => t.id === selectedTicketId);
  const selectedCompany = selectedTicket ? MOCK_COMPANIES.find(c => c.id === selectedTicket.companyId) : null;

  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-140px)] flex flex-col">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
         <div className="bg-white p-5 rounded-md border border-[#f0f0f0] shadow-sm flex items-center justify-between group hover:border-[#d1dbd8] transition-colors">
           <div>
             <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">Ouverts</p>
             <p className="text-2xl font-light text-[#44403c] mt-1">12</p>
           </div>
           <div className="p-3 bg-[#f0f5f9] text-[#456b8c] rounded-sm"><Ticket size={22} strokeWidth={1.5} /></div>
         </div>
         <div className="bg-white p-5 rounded-md border border-[#f0f0f0] shadow-sm flex items-center justify-between group hover:border-red-100 transition-colors">
           <div>
             <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">Urgent</p>
             <p className="text-2xl font-light text-[#8a3c3c] mt-1">2</p>
           </div>
           <div className="p-3 bg-[#fdf2f2] text-[#8a3c3c] rounded-sm"><AlertCircle size={22} strokeWidth={1.5} /></div>
         </div>
         <div className="bg-white p-5 rounded-md border border-[#f0f0f0] shadow-sm flex items-center justify-between group hover:border-[#d1dbd8] transition-colors">
           <div>
             <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">Temps Moyen</p>
             <p className="text-2xl font-light text-[#2a403d] mt-1">45m</p>
           </div>
           <div className="p-3 bg-[#edf2f0] text-[#2a403d] rounded-sm"><Clock size={22} strokeWidth={1.5} /></div>
         </div>
         <div className="bg-white p-5 rounded-md border border-[#f0f0f0] shadow-sm flex items-center justify-between group hover:border-[#e7e5e4] transition-colors">
           <div>
             <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">Satisfaction</p>
             <p className="text-2xl font-light text-[#57534e] mt-1">98%</p>
           </div>
           <div className="p-3 bg-[#f5f5f4] text-[#78716c] rounded-sm"><TrendingUp size={22} strokeWidth={1.5} /></div>
         </div>
      </div>

      {/* Main Content Split View */}
      <div className="flex-1 bg-white rounded-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left List Panel */}
        <div className={`w-full md:w-1/3 border-r border-[#f0f0f0] flex flex-col ${selectedTicketId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-[#f0f0f0] space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="font-medium text-[#44403c] text-lg">Boîte de réception</h3>
               <button className="p-2 hover:bg-[#fafaf9] rounded-full text-[#a8a29e] transition-colors"><Filter size={18} strokeWidth={1.5} /></button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a8a29e]" size={18} strokeWidth={1.5} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-11 pr-4 py-3 w-full bg-[#fafaf9] border border-[#f0f0f0] rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#d1dbd8] transition-all placeholder-[#d6d3d1]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'Open', 'Pending', 'Resolved'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-sm whitespace-nowrap transition-all ${filter === status ? 'bg-[#2a403d] text-white' : 'bg-[#f5f5f4] text-[#78716c] hover:bg-[#e7e5e4]'}`}
                >
                  {status === 'All' ? 'Tous' : status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#f5f5f4]">
            {filteredTickets.map(ticket => {
              const company = MOCK_COMPANIES.find(c => c.id === ticket.companyId);
              return (
                <div 
                  key={ticket.id} 
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-6 hover:bg-[#fafaf9] cursor-pointer transition-all border-l-4 ${selectedTicketId === ticket.id ? 'bg-[#edf2f0]/40 border-[#2a403d]' : 'border-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">{ticket.id}</span>
                    <span className="text-[10px] text-[#a8a29e]">{ticket.lastUpdate}</span>
                  </div>
                  <h4 className={`font-medium text-sm mb-3 line-clamp-1 ${selectedTicketId === ticket.id ? 'text-[#2a403d]' : 'text-[#44403c]'}`}>
                    {ticket.subject}
                  </h4>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                       <div className={`w-6 h-6 rounded-sm ${company?.color} text-white flex items-center justify-center text-[10px] font-bold mr-2 shadow-sm`}>
                         {company?.logo}
                       </div>
                       <span className="text-xs text-[#78716c] font-medium truncate max-w-[100px]">{company?.name}</span>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className={`w-full md:w-2/3 flex flex-col bg-white ${!selectedTicketId ? 'hidden md:flex' : 'flex'}`}>
          {selectedTicket ? (
            <>
              <div className="p-6 border-b border-[#f0f0f0] bg-white sticky top-0 z-10 flex justify-between items-start">
                <div className="flex items-start">
                  <button 
                    onClick={() => setSelectedTicketId(null)}
                    className="md:hidden mr-4 p-2 hover:bg-[#fafaf9] rounded-full"
                  >
                    <ChevronRight className="rotate-180" size={20} />
                  </button>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-semibold text-xl text-[#1a1a1a]">{selectedTicket.subject}</h3>
                      <StatusBadge status={selectedTicket.status} />
                      <PriorityBadge priority={selectedTicket.priority} />
                    </div>
                    <div className="flex items-center text-sm text-[#78716c]">
                      <span className="font-medium text-[#44403c]">{selectedCompany?.name}</span>
                      <span className="mx-2 text-[#e7e5e4]">•</span>
                      <span>Ouvert le 01 Juin 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                   <button className="p-2.5 text-[#a8a29e] hover:text-[#2a403d] hover:bg-[#edf2f0] rounded-sm transition-colors" title="Marquer comme résolu">
                     <CheckCircle2 size={20} strokeWidth={1.5} />
                   </button>
                   <button className="p-2.5 text-[#a8a29e] hover:text-[#57534e] hover:bg-[#f5f5f4] rounded-sm transition-colors">
                     <MoreHorizontal size={20} strokeWidth={1.5} />
                   </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fafaf9]">
                {selectedTicket.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-md p-6 shadow-sm ${msg.role === 'admin' ? 'bg-[#2a403d] text-white rounded-br-none shadow-[#2a403d]/10' : 'bg-white border border-[#f0f0f0] text-[#57534e] rounded-bl-none'}`}>
                      <div className="flex justify-between items-baseline mb-2 space-x-8">
                        <span className={`text-xs font-bold uppercase tracking-wider ${msg.role === 'admin' ? 'text-[#a5b4ac]' : 'text-[#44403c]'}`}>
                          {msg.sender}
                        </span>
                        <span className={`text-[10px] ${msg.role === 'admin' ? 'text-[#738276]' : 'text-[#a8a29e]'}`}>
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed font-light">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white border-t border-[#f0f0f0]">
                <div className="relative group">
                  <textarea 
                    className="w-full bg-[#fafaf9] border border-[#f0f0f0] rounded-sm p-4 pr-14 text-sm focus:ring-1 focus:ring-[#d1dbd8] outline-none resize-none h-28 transition-all group-hover:bg-white text-[#44403c]"
                    placeholder="Tapez votre réponse ici..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button className="p-2 text-[#a8a29e] hover:text-[#2a403d] transition-colors rounded-sm hover:bg-[#f5f5f4]">
                      <Paperclip size={18} strokeWidth={1.5} />
                    </button>
                    <button className="p-2 bg-[#2a403d] hover:bg-[#1a2624] text-white rounded-sm transition-colors shadow-sm">
                      <Send size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#d6d3d1]">
              <div className="w-20 h-20 bg-[#fafaf9] rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={40} strokeWidth={1} className="text-[#d6d3d1]" />
              </div>
              <p className="font-medium text-[#a8a29e]">Sélectionnez un ticket</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardView = () => {
  const totalContracts = MOCK_COMPANIES.reduce((acc, curr) => acc + curr.contracts, 0);
  const totalAdminRevenue = totalContracts * 29.99;
  const activeCompanies = MOCK_COMPANIES.filter(c => c.status === 'Active').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-light text-[#1a1a1a] tracking-tight">Tableau de Bord</h2>
          <p className="text-[#78716c] mt-1">Vue d\'ensemble de l\'activité.</p>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#a8a29e] bg-white px-3 py-1 rounded-sm border border-[#f0f0f0]">Juin 2024</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Sociétés Actives" 
          value={activeCompanies} 
          subtext={`${totalContracts} contrats actifs`}
          icon={Building2} 
          trend="+12%"
        />
        <StatCard 
          title="CA Mensuel Admin" 
          value={formatCurrency(totalAdminRevenue)} 
          subtext="Basé sur 29,99€ / contrat"
          icon={Receipt} 
          trend="+8.5%"
        />
        <StatCard 
          title="CA Annuel Estimé" 
          value={formatCurrency(totalAdminRevenue * 12)} 
          subtext="Projection actuelle"
          icon={BarChart3} 
        />
        <StatCard 
          title="Alertes & Paiements" 
          value="3" 
          subtext="Nécessite attention"
          icon={AlertCircle} 
          alert={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0]">
          <h3 className="text-lg font-medium text-[#44403c] mb-8">Évolution du Chiffre d\'Affaires</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2a403d" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2a403d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} tickFormatter={(value) => `${value}€`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                  formatter={(value) => [`${value} €`, 'Revenu']}
                />
                <Area type="monotone" dataKey="admin" stroke="#2a403d" strokeWidth={2} fillOpacity={1} fill="url(#colorAdmin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0] flex flex-col">
          <h3 className="text-lg font-medium text-[#44403c] mb-6">Alertes Récentes</h3>
          <div className="space-y-4 flex-1">
            {MOCK_ALERTS.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-sm hover:bg-[#fafaf9] transition-colors cursor-pointer border border-transparent hover:border-[#f0f0f0] group">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ring-4 ring-opacity-20 ${alert.type === 'ticket' ? 'bg-[#8a3c3c] ring-[#8a3c3c]' : 'bg-[#8c6b45] ring-[#8c6b45]'}`} />
                <div>
                  <p className="text-sm font-medium text-[#57534e] group-hover:text-[#2a403d] transition-colors">{alert.message}</p>
                  <p className="text-xs text-[#a8a29e] mt-1.5 font-medium">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-[#2a403d] font-bold uppercase tracking-wider py-3 hover:bg-[#edf2f0] rounded-sm transition-colors">
            Voir tous les tickets
          </button>
        </div>
      </div>
    </div>
  );
};

const CompaniesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredCompanies = MOCK_COMPANIES.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn relative">
      <CreateCompanyDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light text-[#1a1a1a] tracking-tight">Gestion des Sociétés</h2>
          <p className="text-[#78716c] mt-1">Gérez vos contrats et visualisez la rentabilité.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a8a29e]" size={18} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="pl-11 pr-4 py-3 w-full sm:w-72 bg-white border border-[#e7e5e4] rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#2a403d] transition-all shadow-sm placeholder-[#d6d3d1]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center space-x-2 bg-[#2a403d] hover:bg-[#1a2624] text-white px-6 py-3 rounded-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={18} strokeWidth={1.5} />
            <span className="font-medium">Nouvelle Société</span>
          </button>
        </div>
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => {
            const adminRevenue = company.contracts * 29.99;
            
            return (
              <div key={company.id} className="bg-white rounded-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                <div className="p-7">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 ${company.color} rounded-sm flex items-center justify-center text-white font-bold text-xl shadow-sm rotate-0 transition-transform duration-300`}>
                      {company.logo}
                    </div>
                    <div className="flex flex-col items-end">
                      <StatusBadge status={company.status} />
                      <span className="text-[10px] text-[#a8a29e] font-mono mt-2 tracking-tight font-medium bg-[#f5f5f4] px-2 py-0.5 rounded-sm">
                        {company.reference}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#44403c] mb-1">{company.name}</h3>
                  <div className="flex items-center text-[#78716c] text-sm mb-6">
                    <Users size={14} className="mr-2" /> {company.employees} employés
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-5 border-t border-[#f0f0f0]">
                    <div>
                      <p className="text-[10px] text-[#a8a29e] font-bold uppercase tracking-widest mb-1">Leur CA (HT)</p>
                      <p className="text-[#2a403d] font-semibold">{formatCurrency(company.monthlyRevenueHT)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#a8a29e] font-bold uppercase tracking-widest mb-1">Contrats</p>
                      <p className="text-[#2a403d] font-semibold">{company.contracts}</p>
                    </div>
                  </div>

                  <div className="mt-2 bg-[#edf2f0]/60 rounded-sm p-4 border border-[#d1dbd8]/50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#4a5d58] uppercase tracking-wide">Rapport Nessaly\'S</span>
                      <span className="text-lg font-bold text-[#2a403d]">{formatCurrency(adminRevenue)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#fafaf9] px-7 py-4 border-t border-[#f0f0f0] flex justify-between items-center">
                   <button className="text-xs font-bold uppercase tracking-wider text-[#a8a29e] hover:text-[#2a403d] transition-colors">Détails</button>
                   <button className="text-xs font-bold uppercase tracking-wider text-[#a8a29e] hover:text-[#2a403d] transition-colors">Factures</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-80 text-[#d6d3d1] bg-white rounded-md border-2 border-dashed border-[#e7e5e4]">
          <Search size={40} strokeWidth={1} className="mb-4 opacity-50" />
          <p className="font-medium">Aucune société trouvée pour "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

const BillingView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn relative">
      <CreateInvoiceDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light text-[#1a1a1a] tracking-tight">Facturation</h2>
          <p className="text-[#78716c] mt-1">Gérez l\'émission et le suivi de vos factures.</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center space-x-2 bg-[#2a403d] hover:bg-[#1a2624] text-white px-6 py-3 rounded-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={1.5} />
          <span className="font-medium">Nouvelle Facture</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-md border border-[#f0f0f0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex items-center justify-between group">
          <div>
            <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">Facturé (Juin)</p>
            <p className="text-3xl font-light text-[#44403c] mt-2">{formatCurrency(1799.40)}</p>
          </div>
          <div className="p-4 bg-[#edf2f0] text-[#2a403d] rounded-sm group-hover:bg-[#dce6e3] transition-colors">
             <FileText size={24} strokeWidth={1.5} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-md border border-[#f0f0f0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex items-center justify-between group">
          <div>
            <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">En attente</p>
            <p className="text-3xl font-light text-[#8c6b45] mt-2">{formatCurrency(989.67)}</p>
          </div>
          <div className="p-4 bg-[#fff8eb] text-[#8c6b45] rounded-sm group-hover:bg-[#fcf0d8] transition-colors">
             <Clock size={24} strokeWidth={1.5} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-md border border-[#f0f0f0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex items-center justify-between group">
           <div>
            <p className="text-[#a8a29e] text-xs font-bold uppercase tracking-widest">Retard</p>
            <p className="text-3xl font-light text-[#8a3c3c] mt-2">{formatCurrency(749.75)}</p>
          </div>
          <div className="p-4 bg-[#fdf2f2] text-[#8a3c3c] rounded-sm group-hover:bg-[#fcebeb] transition-colors">
             <AlertTriangle size={24} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#f0f0f0] overflow-hidden">
        <div className="px-8 py-6 border-b border-[#f0f0f0] flex justify-between items-center">
          <h3 className="text-lg font-medium text-[#44403c]">Dernières Factures</h3>
          <button className="text-xs font-bold uppercase tracking-wider text-[#2a403d] hover:text-[#1a2624] bg-[#edf2f0] px-4 py-2 rounded-sm transition-colors">Tout voir</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#fafaf9] text-[#78716c] font-semibold border-b border-[#f0f0f0]">
              <tr>
                <th className="px-8 py-4">Référence</th>
                <th className="px-8 py-4">Client</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Montant TTC</th>
                <th className="px-8 py-4 text-center">Statut</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f4]">
              {MOCK_INVOICES.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#fafaf9] transition-colors group">
                  <td className="px-8 py-5 font-mono text-[#a8a29e] text-xs">{invoice.ref}</td>
                  <td className="px-8 py-5 font-medium text-[#44403c]">{invoice.company}</td>
                  <td className="px-8 py-5 text-[#a8a29e]">{formatDate(invoice.date)}</td>
                  <td className="px-8 py-5 text-right font-medium text-[#2a403d]">{formatCurrency(invoice.amount)}</td>
                  <td className="px-8 py-5 text-center">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-8 py-5 text-right flex justify-end space-x-2">
                    <button className="p-2 hover:bg-[#f0f0f0] text-[#a8a29e] hover:text-[#57534e] rounded-sm transition-colors" title="Télécharger PDF">
                      <Download size={18} strokeWidth={1.5} />
                    </button>
                    <button className="p-2 hover:bg-[#f0f0f0] text-[#a8a29e] hover:text-[#57534e] rounded-sm transition-colors" title="Envoyer par email">
                      <Send size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Layout & App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'societes', label: 'Sociétés', icon: Building2 },
    { id: 'facturation', label: 'Facturation', icon: Receipt },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'societes': return <CompaniesView />;
      case 'facturation': return <BillingView />;
      case 'stats': return <StatsView />;
      case 'tickets': return <TicketsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#fcfcfc] font-sans text-[#1a1a1a] selection:bg-[#dce6e3] selection:text-[#1a2624]">
      
      {/* Sidebar - Vert Abysse Mat & Raffiné */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#11241f] text-white transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col border-r border-[#1a2e29]
      `}>
        {/* Logo Section */}
        <div className="p-8 pb-10">
          <div className="flex items-center space-x-3 mb-1 group cursor-pointer">
            <div className="w-10 h-10 bg-[#1c332d] border border-[#2a403d] rounded-sm flex items-center justify-center shadow-sm group-hover:border-[#4a5d58] transition-colors duration-300">
              <span className="font-serif font-bold text-xl text-[#d4dcd6]">N</span>
            </div>
            <div>
               <span className="font-serif font-medium text-2xl tracking-wide text-[#f0f2f1] block leading-none">Nessaly\'S</span>
               <span className="text-[10px] text-[#738276] uppercase tracking-[0.2em] font-medium ml-0.5">Group</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-[#4a5d58] uppercase tracking-widest mb-4 mt-2">Principal</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-sm transition-all duration-300 group ${activeTab === item.id ? 'bg-[#1c332d] text-[#e2e8f0] border-l-2 border-[#a5b4ac]' : 'text-[#8c9e9a] hover:text-[#d4dcd6] hover:bg-[#162b25] border-l-2 border-transparent'}`}
            >
              <item.icon size={20} strokeWidth={1.5} className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-100' : 'group-hover:scale-100'}`} />
              <span className="font-medium tracking-wide text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-6 mt-auto">
          <div className="bg-[#162b25] border border-[#1c332d] rounded-sm p-3 flex items-center hover:bg-[#1c332d] transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-sm bg-[#2a403d] flex items-center justify-center text-[#d4dcd6] font-bold border border-[#4a5d58]">
              AD
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-[#f0f2f1] truncate group-hover:text-white transition-colors">Administrateur</p>
              <div className="flex items-center text-xs text-[#738276] mt-0.5">
                <span>Gérer le compte</span>
              </div>
            </div>
            <div className="ml-auto text-[#4a5d58] group-hover:text-[#8c9e9a] transition-colors">
               <LogOut size={16} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen bg-[#fcfcfc]">
        
        {/* Top Header - Minimaliste */}
        <header className="h-20 flex items-center justify-between px-8 z-10 bg-white sticky top-0 border-b border-[#f0f0f0]">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-sm text-[#78716c] hover:bg-[#f5f5f4] mr-4"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-medium text-[#44403c] capitalize hidden sm:block tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-[#fafaf9] rounded-sm px-4 py-2.5 border border-[#f0f0f0] focus-within:ring-1 focus-within:ring-[#d1dbd8] transition-shadow">
              <Search size={18} className="text-[#a8a29e] mr-2" strokeWidth={1.5} />
              <input 
                type="text" 
                placeholder="Recherche globale..." 
                className="bg-transparent border-none focus:outline-none text-sm text-[#57534e] w-64 placeholder-[#d6d3d1]"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-[#a8a29e] hover:text-[#57534e] transition-colors rounded-sm hover:bg-[#fafaf9]">
                <HelpCircle size={22} strokeWidth={1.5} />
              </button>
              <button className="relative p-2 text-[#a8a29e] hover:text-[#2a403d] transition-colors rounded-sm hover:bg-[#edf2f0]">
                <Bell size={22} strokeWidth={1.5} />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#8a3c3c] rounded-full"></span>
              </button>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[#e7e5e4] mx-2"></div>
            <div className="flex items-center space-x-2 px-2 py-1">
               <Briefcase size={16} strokeWidth={1.5} className="text-[#4a5d58]" />
               <span className="font-medium text-sm tracking-wide text-[#44403c]">Nessaly\'S Corp</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#0f1412]/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
