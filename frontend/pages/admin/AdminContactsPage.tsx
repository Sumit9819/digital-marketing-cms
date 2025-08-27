import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import backend from '~backend/client';
import type { ContactSubmission } from '~backend/content/types';

export function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, [filter]);

  const loadContacts = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await backend.admin.listContacts({
        authorization: `Bearer ${token}`,
        status: filter === 'all' ? undefined : filter,
        limit: 100
      });

      setContacts(response.contacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast({
        title: "Error",
        description: "Failed to load contacts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: number, status: 'new' | 'contacted' | 'closed') => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      await backend.admin.updateContactStatus({
        authorization: `Bearer ${token}`,
        id,
        status
      });

      toast({
        title: "Success",
        description: "Contact status updated successfully.",
      });

      loadContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast({
        title: "Error",
        description: "Failed to update contact status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'contacted':
        return <Badge variant="default">Contacted</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4" />;
      case 'contacted':
        return <Mail className="h-4 w-4" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
        <p className="text-gray-600">Manage contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          <Filter className="h-4 w-4 mr-2" />
          All Contacts ({contacts.length})
        </Button>
        <Button
          variant={filter === 'new' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('new')}
        >
          New
        </Button>
        <Button
          variant={filter === 'contacted' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('contacted')}
        >
          Contacted
        </Button>
        <Button
          variant={filter === 'closed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('closed')}
        >
          Closed
        </Button>
      </div>

      {/* Contacts List */}
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
              <p>Contact form submissions will appear here.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {contact.name}
                      </h3>
                      {getStatusBadge(contact.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                          {contact.email}
                        </a>
                      </div>
                      
                      {contact.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      
                      {contact.company && (
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2" />
                          {contact.company}
                        </div>
                      )}
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(contact.created_at)}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {contact.status === 'new' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateContactStatus(contact.id, 'contacted')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Contacted
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateContactStatus(contact.id, 'closed')}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close
                        </Button>
                      </>
                    )}
                    
                    {contact.status === 'contacted' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'closed')}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Close
                      </Button>
                    )}
                    
                    {contact.status === 'closed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'new')}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Reopen
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
