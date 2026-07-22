import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = () => {
    fetch(`http://localhost:8080/api/tickets/${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setTicket(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch ticket", err);
        setLoading(false);
      });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    fetch(`http://localhost:8080/api/tickets/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        setTicket({ ...ticket, status: data.status });
      })
      .catch(err => console.error("Failed to update status", err));
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    
    setSending(true);
    fetch(`http://localhost:8080/api/tickets/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ body: replyBody })
    })
      .then(res => res.json())
      .then(newMessage => {
        setTicket({
          ...ticket,
          messages: [...ticket.messages, newMessage],
          status: ticket.status === 'NEW' ? 'OPEN' : ticket.status
        });
        setReplyBody('');
      })
      .catch(err => console.error("Failed to send reply", err))
      .finally(() => setSending(false));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'OPEN': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'AI_RESPONDED': return 'bg-purple-100 text-purple-800';
      case 'RESOLVED': return 'bg-gray-100 text-gray-800';
      case 'CLOSED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12 w-full">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ticket) {
    return <div className="text-center p-12 text-gray-500">Ticket not found.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/tickets" className="text-gray-400 hover:text-gray-900 transition-colors bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{ticket.subject}</h1>
          <p className="text-sm text-gray-500 mt-1">From: <span className="font-medium text-gray-700">{ticket.customerEmail}</span></p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Status:</span>
          <select 
            value={ticket.status} 
            onChange={handleStatusChange}
            className={`text-sm font-semibold rounded-lg border-gray-200 py-1.5 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm ${getStatusColor(ticket.status)}`}
          >
            <option value="NEW">NEW</option>
            <option value="OPEN">OPEN</option>
            <option value="PENDING">PENDING</option>
            <option value="AI_RESPONDED">AI_RESPONDED</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {ticket.messages.map((msg, index) => {
          const isCustomer = msg.senderType === 'CUSTOMER';
          return (
            <div key={msg.id} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-2xl rounded-2xl p-5 shadow-sm border ${
                isCustomer 
                  ? 'bg-white border-gray-200 text-gray-800' 
                  : 'bg-indigo-50 border-indigo-100 text-indigo-900'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isCustomer ? 'text-gray-500' : 'text-indigo-600'}`}>
                    {msg.senderType}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <form onSubmit={handleReplySubmit}>
          <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">Reply to Customer</label>
          <textarea
            id="reply"
            rows="4"
            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3"
            placeholder="Type your response here..."
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
          ></textarea>
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={sending || !replyBody.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-sm transition-all"
            >
              {sending ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
