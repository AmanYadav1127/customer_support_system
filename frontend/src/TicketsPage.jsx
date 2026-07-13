export default function TicketsPage() {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Support Tickets</h1>
          <p className="text-gray-500 mt-2">Manage and view all customer requests.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          New Ticket
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-96 flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No tickets found</h3>
        <p className="text-gray-500 mt-1 max-w-sm">There are currently no support tickets in your queue. When new requests arrive, they will appear here.</p>
      </div>
    </div>
  );
}
