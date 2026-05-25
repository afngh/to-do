import groqProvider from '../providers/groq.js';

class AIService {
  constructor() {
    this.modelMap = {
      'llama': 'llama-3.3-70b-versatile',
      'llama-large': 'llama-3.3-70b-versatile',
      'llama-small': 'llama-3.1-8b-instant',
    };
  }

  /**
   * Generates a chat completion using the requested model.
   * @param {Array} messages - Chat context/history
   * @param {Object} options - Provider/model parameters (e.g., model name, temperature)
   * @returns {Promise<Object>} - Standardized Success Response: { success: true, content: '...' }
   */
  async generateResponse(messages, options = {}) {
    const rawModel = options.model || 'llama';
    const targetModel = this.modelMap[rawModel.toLowerCase()] || rawModel;

    const response = await groqProvider.generateCompletion(messages, {
      ...options,
      model: targetModel,
    });

    // Success response condition as requested by the spec
    return {
      success: response.success,
      content: response.content,
    };
  }
}

export default new AIService();
