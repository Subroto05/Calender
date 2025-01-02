import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function CommunicationMethodManagement() {
  const { communicationMethods, addCommunicationMethod, updateCommunicationMethod, deleteCommunicationMethod } = useAppContext();
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sequence: 0,
    mandatory: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMethod) {
      updateCommunicationMethod(editingMethod._id, formData);
    } else {
      addCommunicationMethod(formData);
    }
    setFormData({
      name: '',
      description: '',
      sequence: 0,
      mandatory: false,
    });
    setEditingMethod(null);
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setFormData({
      name: method.name,
      description: method.description,
      sequence: method.sequence,
      mandatory: method.mandatory,
    });
  };

  const handleDelete = (methodId) => {
    if (window.confirm('Are you sure you want to delete this communication method?')) {
      deleteCommunicationMethod(methodId);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-red-300">
        <h2 className="text-xl font-semibold text-red-700 mb-6">
          {editingMethod ? 'Edit Communication Method' : 'Add New Communication Method'}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Method Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="sequence" className="block text-sm font-medium text-gray-700">
              Sequence
            </label>
            <input
              type="number"
              name="sequence"
              id="sequence"
              value={formData.sequence}
              onChange={handleInputChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            name="mandatory"
            id="mandatory"
            checked={formData.mandatory}
            onChange={handleInputChange}
            className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="mandatory" className="ml-2 text-sm text-gray-700">
            Mandatory
          </label>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {editingMethod ? 'Update Method' : 'Add Method'}
          </button>
          {editingMethod && (
            <button
              type="button"
              onClick={() => {
                setEditingMethod(null);
                setFormData({
                  name: '',
                  description: '',
                  sequence: 0,
                  mandatory: false,
                });
              }}
              className="inline-flex items-center px-4 py-2 bg-white border border-red-300 rounded-md font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table Section */}
      <div>
        <h2 className="text-xl font-semibold text-red-700 mb-6">Communication Methods</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-700 uppercase tracking-wider">
                  Sequence
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-700 uppercase tracking-wider">
                  Mandatory
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {communicationMethods.map((method) => (
                <tr key={method._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {method.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {method.sequence}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {method.mandatory ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(method)}
                      className="text-red-600 hover:text-red-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(method._id)}
                      className="text-red-600 hover:text-red-800"
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
