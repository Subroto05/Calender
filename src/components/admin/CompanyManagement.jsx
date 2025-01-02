import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function CompanyManagement() {
  const { companies, addCompany, updateCompany, deleteCompany } = useAppContext();
  const [editingCompany, setEditingCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedinProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: 14,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCompany) {
      updateCompany(editingCompany._id, formData);
    } else {
      addCompany(formData);
    }
    setFormData({
      name: '',
      location: '',
      linkedinProfile: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: 14,
    });
    setEditingCompany(null);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      location: company.location,
      linkedinProfile: company.linkedinProfile,
      emails: company.emails.join(', '),
      phoneNumbers: company.phoneNumbers.join(', '),
      comments: company.comments,
      communicationPeriodicity: company.communicationPeriodicity,
    });
  };

  const handleDelete = (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      deleteCompany(companyId);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          {editingCompany ? 'Edit Company' : 'Add New Company'}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedinProfile"
              id="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="emails" className="block text-sm font-medium text-gray-700">
              Emails (comma-separated)
            </label>
            <input
              type="text"
              name="emails"
              id="emails"
              value={formData.emails}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phoneNumbers" className="block text-sm font-medium text-gray-700">
              Phone Numbers (comma-separated)
            </label>
            <input
              type="text"
              name="phoneNumbers"
              id="phoneNumbers"
              value={formData.phoneNumbers}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="communicationPeriodicity" className="block text-sm font-medium text-gray-700">
              Communication Periodicity (days)
            </label>
            <input
              type="number"
              name="communicationPeriodicity"
              id="communicationPeriodicity"
              value={formData.communicationPeriodicity}
              onChange={handleInputChange}
              required
              min="1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            name="comments"
            id="comments"
            rows="3"
            value={formData.comments}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingCompany ? 'Update Company' : 'Add Company'}
          </button>
          {editingCompany && (
            <button
              type="button"
              onClick={() => {
                setEditingCompany(null);
                setFormData({
                  name: '',
                  location: '',
                  linkedinProfile: '',
                  emails: '',
                  phoneNumbers: '',
                  comments: '',
                  communicationPeriodicity: 14,
                });
              }}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Companies</h2>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodicity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.communicationPeriodicity} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(company)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
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
}

