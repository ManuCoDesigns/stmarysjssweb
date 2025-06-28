const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // Set auth token in localStorage
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  // Remove auth token from localStorage
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  // Make authenticated request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password, userType) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, userType }),
    });

    if (response.token) {
      this.setAuthToken(response.token);
    }

    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.setAuthToken(response.token);
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeAuthToken();
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(userData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Gallery methods
  async getGalleryItems(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/gallery${queryString ? `?${queryString}` : ''}`);
  }

  async getGalleryItem(id) {
    return this.request(`/gallery/${id}`);
  }

  async uploadMedia(formData) {
    return this.request('/gallery/upload', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async updateGalleryItem(id, data) {
    return this.request(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryItem(id) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  async incrementDownload(id) {
    return this.request(`/gallery/${id}/download`, {
      method: 'POST',
    });
  }

  // User management methods
  async getUsers(role = '') {
    return this.request(`/users${role ? `?role=${role}` : ''}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Assignment methods
  async getAssignments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/assignments${queryString ? `?${queryString}` : ''}`);
  }

  async createAssignment(assignmentData) {
    return this.request('/assignments', {
      method: 'POST',
      body: JSON.stringify(assignmentData),
    });
  }

  async updateAssignment(id, assignmentData) {
    return this.request(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assignmentData),
    });
  }

  async deleteAssignment(id) {
    return this.request(`/assignments/${id}`, {
      method: 'DELETE',
    });
  }

  async submitAssignment(id, submissionData) {
    return this.request(`/assignments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
  }

  // Grade methods
  async getGrades(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/grades${queryString ? `?${queryString}` : ''}`);
  }

  async createGrade(gradeData) {
    return this.request('/grades', {
      method: 'POST',
      body: JSON.stringify(gradeData),
    });
  }

  async updateGrade(id, gradeData) {
    return this.request(`/grades/${id}`, {
      method: 'PUT',
      body: JSON.stringify(gradeData),
    });
  }

  // Message methods
  async getMessages(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/messages${queryString ? `?${queryString}` : ''}`);
  }

  async sendMessage(messageData) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async markMessageAsRead(id) {
    return this.request(`/messages/${id}/read`, {
      method: 'PUT',
    });
  }

  async deleteMessage(id) {
    return this.request(`/messages/${id}`, {
      method: 'DELETE',
    });
  }

  // News methods
  async getNews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/news${queryString ? `?${queryString}` : ''}`);
  }

  async createNews(newsData) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  }

  async updateNews(id, newsData) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  }

  async deleteNews(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();