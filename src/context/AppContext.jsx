import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchCompanies();
    fetchCommunicationMethods();
    fetchCommunications();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchCommunicationMethods = async () => {
    try {
      const response = await fetch('/api/communication-methods');
      const data = await response.json();
      setCommunicationMethods(data);
    } catch (error) {
      console.error('Error fetching communication methods:', error);
    }
  };

  const fetchCommunications = async () => {
    try {
      const response = await fetch('/api/communications');
      const data = await response.json();
      setCommunications(data);
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  };

  const addCompany = async (companyData) => {
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      const newCompany = await response.json();
      setCompanies([...companies, newCompany]);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const updateCompany = async (companyId, companyData) => {
    try {
      const response = await fetch(`/api/companies/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      const updatedCompany = await response.json();
      setCompanies(
        companies.map((company) =>
          company._id === companyId ? updatedCompany : company
        )
      );
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const deleteCompany = async (companyId) => {
    try {
      await fetch(`/api/companies/${companyId}`, {
        method: 'DELETE',
      });
      setCompanies(companies.filter((company) => company._id !== companyId));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const addCommunicationMethod = async (methodData) => {
    try {
      const response = await fetch('/api/communication-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(methodData),
      });
      const newMethod = await response.json();
      setCommunicationMethods([...communicationMethods, newMethod]);
    } catch (error) {
      console.error('Error adding communication method:', error);
    }
  };

  const updateCommunicationMethod = async (methodId, methodData) => {
    try {
      const response = await fetch(`/api/communication-methods/${methodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(methodData),
      });
      const updatedMethod = await response.json();
      setCommunicationMethods(
        communicationMethods.map((method) =>
          method._id === methodId ? updatedMethod : method
        )
      );
    } catch (error) {
      console.error('Error updating communication method:', error);
    }
  };

  const deleteCommunicationMethod = async (methodId) => {
    try {
      await fetch(`/api/communication-methods/${methodId}`, {
        method: 'DELETE',
      });
      setCommunicationMethods(
        communicationMethods.filter((method) => method._id !== methodId)
      );
    } catch (error) {
      console.error('Error deleting communication method:', error);
    }
  };

  const addCommunication = async (communicationData) => {
    try {
      const response = await fetch('/api/communications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(communicationData),
      });
      const newCommunication = await response.json();
      setCommunications([...communications, newCommunication]);
    } catch (error) {
      console.error('Error adding communication:', error);
    }
  };

  const updateNotifications = () => {
    const today = new Date();
    const overdueNotifications = companies
      .filter((company) => {
        const lastCommunication = communications
          .filter((comm) => comm.companyId === company._id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        if (!lastCommunication) return true;
        const nextDueDate = new Date(lastCommunication.date);
        nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);
        return nextDueDate < today;
      })
      .map((company) => ({
        type: 'overdue',
        companyId: company._id,
        companyName: company.name,
      }));

    const dueNotifications = companies
      .filter((company) => {
        const lastCommunication = communications
          .filter((comm) => comm.companyId === company._id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        if (!lastCommunication) return false;
        const nextDueDate = new Date(lastCommunication.date);
        nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);
        return (
          nextDueDate.getDate() === today.getDate() &&
          nextDueDate.getMonth() === today.getMonth() &&
          nextDueDate.getFullYear() === today.getFullYear()
        );
      })
      .map((company) => ({
        type: 'due',
        companyId: company._id,
        companyName: company.name,
      }));

    setNotifications([...overdueNotifications, ...dueNotifications]);
  };

  useEffect(() => {
    updateNotifications();
  }, [companies, communications]);

  return (
    <AppContext.Provider
      value={{
        companies,
        communicationMethods,
        communications,
        notifications,
        addCompany,
        updateCompany,
        deleteCompany,
        addCommunicationMethod,
        updateCommunicationMethod,
        deleteCommunicationMethod,
        addCommunication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

