import React, { useState } from 'react'
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  PieChart as PieChartIcon,
  Plus,
  Receipt,
  Search,
  Target,
  Ticket,
  TrendingUp,
  User,
  X
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'companies', label: 'Societes', icon: Building2 },
  { id: 'billing', label: 'Facturation', icon: Receipt },
  { id: 'stats', label: 'Statistiques', icon: BarChart3 },
  { id: 'tickets', label: 'Tickets', icon: Ticket }
]

const formatCurrency = (value = 0) => `${value.toFixed(2)} EUR`

const StatCard = ({ title, value, subtext, icon: Icon }) => (
  <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 flex flex-col gap-2 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9ca3af]">{title}</p>
      <span className="text-[#2a403d] bg-[#edf2f0] px-2 py-1 rounded-md">
        <Icon size={16} />
      </span>
    </div>
    <p className="text-2xl font-light text-[#111827]">{value}</p>
    {subtext && <p className="text-xs text-[#6b7280]">{subtext}</p>}
  </div>
)

const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-10 text-center bg-white flex flex-col items-center gap-4">
    <div className="p-3 rounded-full bg-[#f3f4f6] text-[#2a403d]">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-lg font-semibold text-[#111827]">{title}</p>
      <p className="text-sm text-[#6b7280]">{description}</p>
    </div>
  </div>
)

const LoginScreen = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('Merci de renseigner vos identifiants professionnels.')
      return
    }
    setError('')
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1b18] via-[#11241f] to-[#1c332d] flex items-center justify-center p-6">
      <div className="bg-white/5 border border-white/10 rounded-3xl w-full max-w-4xl shadow-[0_30px_120px_rgba(0,0,0,0.4)] backdrop-blur-md grid md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex flex-col justify-between p-10 text-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-[#8bb3a4] mb-4">Nessalys Group</p>
            <h1 className="text-4xl font-light leading-tight">Portail securise</h1>
            <p className="text-sm text-[#d1d5db] mt-5">
              L'espace admin est pret pour recevoir des donnees Supabase. Aucun jeux fictifs n'est conserve.
            </p>
          </div>
          <div className="space-y-3 text-sm text-[#d1d5db]">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#8bb3a4]" />
              <span>Compatible desktop, tablette et mobile.</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#8bb3a4]" />
              <span>Architecture prete pour Supabase.</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 md:p-10">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#9ca3af]">Espace admin</p>
            <h2 className="text-2xl font-semibold text-[#111827] mt-2">Connexion</h2>
            <p className="text-sm text-[#6b7280]">Identifiez-vous pour acceder a vos outils.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase font-semibold text-[#4b5563] flex items-center gap-2 mb-2">
                <Mail size={14} /> Email professionnel
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="prenom.nom@nessalys.com"
                className="w-full border border-[#d1d5db] rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2a403d] outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-[#4b5563] flex items-center gap-2 mb-2">
                <Lock size={14} /> Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full border border-[#d1d5db] rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#2a403d] outline-none tracking-[0.4em]"
              />
            </div>
            {error && <p className="text-xs text-[#b91c1c] bg-[#fef2f2] border border-[#fee2e2] rounded-md px-3 py-2">{error}</p>}
            <button type="submit" className="w-full bg-[#2a403d] text-white py-3 rounded-md font-semibold uppercase tracking-wide">
              Se connecter
            </button>
            <button type="button" onClick={onLogin} className="w-full border border-[#d1d5db] text-[#2a403d] py-3 rounded-md font-semibold uppercase tracking-wide">
              Mode demo
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const DashboardView = ({ companies, invoices, tickets, revenuePoints }) => {
  const totalContracts = companies.reduce((sum, company) => sum + (company.contracts || 0), 0)
  const overdueInvoices = invoices.filter((invoice) => invoice.status === 'Overdue').length
  const openTickets = tickets.filter((ticket) => ticket.status !== 'Resolved').length

  const chartData = revenuePoints.length ? revenuePoints : [{ label: 'A definir', value: 0 }]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-light text-[#111827]">Pilotage temps reel</h2>
          <p className="text-sm text-[#6b7280]">Les sections attendent les flux Supabase.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border border-[#d1d5db] text-[#2a403d]">
          <Plus size={16} /> Connecter une source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Societes" value={companies.length} subtext="Alimente via Supabase" icon={Building2} />
        <StatCard title="Contrats" value={totalContracts} subtext="Somme actuelle" icon={Target} />
        <StatCard title="Factures en retard" value={overdueInvoices} subtext="Surveillance" icon={Receipt} />
        <StatCard title="Tickets ouverts" value={openTickets} subtext="Support client" icon={Ticket} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#e5e5e5] rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#111827]">Evolution du CA</h3>
              <p className="text-sm text-[#6b7280]">Chaque point sera injecte depuis Supabase.</p>
            </div>
          </div>
          {revenuePoints.length ? (
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="ca" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2a403d" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2a403d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip formatter={(value) => `${value} EUR`} />
                  <Area type="monotone" dataKey="value" stroke="#2a403d" fill="url(#ca)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState icon={TrendingUp} title="Aucune donnee" description="Connectez Supabase pour afficher votre historique de revenus." />
          )}
        </div>
        <div className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#111827]">Alertes</h3>
            <AlertCircle size={18} className="text-[#9ca3af]" />
          </div>
          <EmptyState icon={AlertCircle} title="Rien a signaler" description="Les flux Supabase alimenteront cette liste en temps reel." />
        </div>
      </div>
    </div>
  )
}

const CompaniesView = ({ companies }) => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-light text-[#111827]">Societes</h2>
        <p className="text-sm text-[#6b7280]">Les fiches seront injectees depuis Supabase.</p>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={16} />
        <input className="w-full border border-[#d1d5db] rounded-md pl-10 pr-4 py-2.5 text-sm" placeholder="Recherche" disabled />
      </div>
    </div>
    {companies.length ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {companies.map((company) => {
          const initials = (company.name || 'NG').split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()
          return (
            <div key={company.id} className="bg-white border border-[#e5e5e5] rounded-lg p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-md bg-[#2a403d] text-white flex items-center justify-center font-semibold">
                  {initials}
                </div>
                <span className="text-[11px] font-mono text-[#9ca3af]">{company.reference || 'REF-000'}</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#111827]">{company.name || 'Societe'}</p>
                <p className="text-sm text-[#6b7280]">{company.address || 'Adresse a renseigner'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase text-[#9ca3af]">Contrats</p>
                  <p className="font-semibold text-[#2a403d]">{company.contracts ?? '-'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-[#9ca3af]">CA mensuel</p>
                  <p className="font-semibold text-[#2a403d]">{company.revenue ? formatCurrency(company.revenue) : '-'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <span>{company.contactEmail || 'email@client.com'}</span>
                <span className="px-2 py-1 border border-[#d1d5db] rounded-md text-[11px] uppercase">
                  {company.status || 'Pending'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    ) : (
      <EmptyState icon={Building2} title="Aucune societe" description="Creez vos fiches depuis Supabase pour alimenter cette vue." />
    )}
  </div>
)

const BillingView = ({ invoices }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-light text-[#111827]">Facturation</h2>
      <p className="text-sm text-[#6b7280]">Les factures apparaissent des qu'elles sont synchronisees.</p>
    </div>
    {invoices.length ? (
      <div className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#f9fafb] text-[#6b7280] uppercase text-xs tracking-[0.3em]">
            <tr>
              <th className="px-4 py-3 text-left">Reference</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Emission</th>
              <th className="px-4 py-3 text-left">Echeance</th>
              <th className="px-4 py-3 text-right">Montant</th>
              <th className="px-4 py-3 text-center">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-4 py-3 font-mono text-xs text-[#111827]">{invoice.reference}</td>
                <td className="px-4 py-3">{invoice.client}</td>
                <td className="px-4 py-3">{invoice.date || '-'}</td>
                <td className="px-4 py-3">{invoice.dueDate || '-'}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#2a403d]">{invoice.amount ? formatCurrency(invoice.amount) : '-'}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 rounded-md border border-[#d1d5db] text-xs">{invoice.status || 'Pending'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <EmptyState icon={Receipt} title="Aucune facture" description="Connectez Supabase pour suivre vos flux financiers en direct." />
    )}
  </div>
)

const StatsView = ({ companies }) => {
  const totalContracts = companies.reduce((sum, company) => sum + (company.contracts || 0), 0)
  const mrr = totalContracts * 29.99
  const arr = mrr * 12
  const avgRevenue = companies.length ? companies.reduce((sum, company) => sum + (company.revenue || 0), 0) / companies.length : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light text-[#111827]">Statistiques</h2>
        <p className="text-sm text-[#6b7280]">Pret pour l'integration des donnees reelles.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="MRR" value={formatCurrency(mrr)} subtext="Base 29.99 EUR" icon={Activity} />
        <StatCard title="ARR" value={formatCurrency(arr)} subtext="Projection annuelle" icon={TrendingUp} />
        <StatCard title="Panier moyen" value={formatCurrency(avgRevenue)} subtext="Par societe" icon={PieChartIcon} />
        <StatCard title="Total contrats" value={totalContracts} subtext="Synchronise via Supabase" icon={Target} />
      </div>
      <EmptyState icon={BarChart3} title="Graphiques en attente" description="Les segments seront generes des que Supabase sera branche." />
    </div>
  )
}

const TicketsView = ({ tickets }) => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-light text-[#111827]">Support</h2>
      <p className="text-sm text-[#6b7280]">Les echanges clients seront charges depuis Supabase.</p>
    </div>
    {tickets.length ? (
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white border border-[#e5e5e5] rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#9ca3af]">{ticket.id}</span>
              <span className="px-2 py-1 text-xs border border-[#d1d5db] rounded-md">{ticket.status || 'Open'}</span>
            </div>
            <p className="text-sm font-semibold text-[#111827]">{ticket.subject || 'Objet du ticket'}</p>
            <p className="text-xs text-[#6b7280] mt-1">{ticket.company || 'Client'}</p>
            <p className="text-sm text-[#4b5563] mt-3">{ticket.preview || 'Resume en attente.'}</p>
          </div>
        ))}
      </div>
    ) : (
      <EmptyState icon={MessageSquare} title="Aucun ticket" description="Les conversations clients apparaitront ici des que Supabase sera branche." />
    )}
  </div>
)

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [companies] = useState([])
  const [invoices] = useState([])
  const [tickets] = useState([])
  const [revenuePoints] = useState([])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView companies={companies} invoices={invoices} tickets={tickets} revenuePoints={revenuePoints} />
      case 'companies':
        return <CompaniesView companies={companies} />
      case 'billing':
        return <BillingView invoices={invoices} />
      case 'stats':
        return <StatsView companies={companies} />
      case 'tickets':
        return <TicketsView tickets={tickets} />
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#11241f] text-white transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center mr-3">
            <User size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold">Nessalys</p>
            <p className="text-xs text-white/70 uppercase tracking-[0.3em]">Admin</p>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                activeTab === item.id ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-md border border-[#e5e7eb]" onClick={() => setIsSidebarOpen((prev) => !prev)}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <p className="text-lg font-semibold text-[#111827]">
                {MENU_ITEMS.find((item) => item.id === activeTab)?.label}
              </p>
              <p className="text-xs text-[#6b7280]">Interface prete pour Supabase</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-[#6b7280] hover:bg-[#f3f4f6]">
              <Bell size={18} />
            </button>
            <button className="inline-flex items-center gap-2 text-sm text-[#2a403d] border border-[#d1d5db] px-3 py-1.5 rounded-md">
              <LogOut size={16} /> Quitter
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
