const BASE_URL = 'http://localhost:3333';

// Fonction pour effectuer une requête fetch
const fetchData = async (url, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${BASE_URL}${url}`, options);
  return await response.json();
};

// Test des routes pour les prompts
const testPromptRoutes = async () => {
  console.log('Test des routes pour les prompts :');

  // GET /api/prompts
  const allPrompts = await fetchData('/api/prompts');
  console.log('Tous les prompts :', allPrompts);

  // POST /api/prompts
  const newPrompt = await fetchData('/api/prompts', 'POST', { title: 'Nouveau prompt', content: 'Contenu du nouveau prompt' });
  console.log('Nouveau prompt créé :', newPrompt);

  // GET /api/prompts/:id
  const promptId = newPrompt.id;
  const singlePrompt = await fetchData(`/api/prompts/${promptId}`);
  console.log('Prompt individuel :', singlePrompt);

  // PUT /api/prompts/:id
  const updatedPrompt = await fetchData(`/api/prompts/${promptId}`, 'PUT', { title: 'Prompt mis à jour', content: 'Contenu mis à jour' });
  console.log('Prompt mis à jour :', updatedPrompt);

  // DELETE /api/prompts/:id
  const deletedPrompt = await fetchData(`/api/prompts/${promptId}`, 'DELETE');
  console.log('Prompt supprimé :', deletedPrompt);
};

// Test des routes pour les exécutions
const testExecutionRoutes = async () => {
  console.log('Test des routes pour les exécutions :');

  // GET /api/executions/:id
  const executionId = 1; // Remplacez par un ID valide
  const execution = await fetchData(`/api/executions/${executionId}`);
  console.log('Exécution individuelle :', execution);

  // DELETE /api/executions/:id
  const deletedExecution = await fetchData(`/api/executions/${executionId}`, 'DELETE');
  console.log('Exécution supprimée :', deletedExecution);
};

// Exécution des tests
// Fonction pour mettre à jour le résultat
const updateResult = (id, message) => {
  document.getElementById(id).textContent = message;
};

// GET /api/prompts
document.getElementById('btn-get-prompts').addEventListener('click', async () => {
  try {
    const allPrompts = await fetchData('/api/prompts');
    console.log('Tous les prompts :', allPrompts);
    updateResult('result-get-prompts', 'GET /api/prompts réussi. Vérifiez la console pour les détails.');
  } catch (error) {
    console.error('Erreur lors de GET /api/prompts :', error);
    updateResult('result-get-prompts', 'Erreur lors de GET /api/prompts. Vérifiez la console.');
  }
});

// POST /api/prompts
document.getElementById('btn-post-prompts').addEventListener('click', async () => {
  try {
    const inputPrompt = document.getElementById('input-post-prompts').value;
    const inputName = document.getElementById('input-post-name').value;
    const newPrompt = await fetchData('/api/prompts', 'POST', { name: inputName, description: inputPrompt, defaultParams: {} });
    console.log('Nouveau prompt créé :', newPrompt);
    updateResult('result-post-prompts', 'POST /api/prompts réussi. Vérifiez la console pour les détails.');
  } catch (error) {
    console.error('Erreur lors de POST /api/prompts :', error);
    updateResult('result-post-prompts', 'Erreur lors de POST /api/prompts. Vérifiez la console.');
  }
});

// GET /api/prompts/:id
document.getElementById('btn-get-prompts-id').addEventListener('click', async () => {
  try {
    const promptId = 1; // Remplacez par un ID valide
    const singlePrompt = await fetchData(`/api/prompts/${promptId}`);
    console.log('Prompt individuel :', singlePrompt);
    updateResult('result-get-prompts-id', `GET /api/prompts/${promptId} réussi. Vérifiez la console pour les détails.`);
  } catch (error) {
    console.error('Erreur lors de GET /api/prompts/:id :', error);
    updateResult('result-get-prompts-id', 'Erreur lors de GET /api/prompts/:id. Vérifiez la console.');
  }
});

// PUT /api/prompts/:id
document.getElementById('btn-put-prompts-id').addEventListener('click', async () => {
  try {
    const promptId = 1; // Remplacez par un ID valide
    const updatedPrompt = await fetchData(`/api/prompts/${promptId}`, 'PUT', { title: 'Prompt mis à jour', content: 'Contenu mis à jour' });
    console.log('Prompt mis à jour :', updatedPrompt);
    updateResult('result-put-prompts-id', `PUT /api/prompts/${promptId} réussi. Vérifiez la console pour les détails.`);
  } catch (error) {
    console.error('Erreur lors de PUT /api/prompts/:id :', error);
    updateResult('result-put-prompts-id', 'Erreur lors de PUT /api/prompts/:id. Vérifiez la console.');
  }
});

// DELETE /api/prompts/:id
document.getElementById('btn-delete-prompts-id').addEventListener('click', async () => {
  try {
    const promptId = 1; // Remplacez par un ID valide
    const deletedPrompt = await fetchData(`/api/prompts/${promptId}`, 'DELETE');
    console.log('Prompt supprimé :', deletedPrompt);
    updateResult('result-delete-prompts-id', `DELETE /api/prompts/${promptId} réussi. Vérifiez la console pour les détails.`);
  } catch (error) {
    console.error('Erreur lors de DELETE /api/prompts/:id :', error);
    updateResult('result-delete-prompts-id', 'Erreur lors de DELETE /api/prompts/:id. Vérifiez la console.');
  }
});

// GET /api/executions/:id
document.getElementById('btn-get-executions-id').addEventListener('click', async () => {
  try {
    const executionId = 1; // Remplacez par un ID valide
    const execution = await fetchData(`/api/executions/${executionId}`);
    console.log('Exécution individuelle :', execution);
    updateResult('result-get-executions-id', `GET /api/executions/${executionId} réussi. Vérifiez la console pour les détails.`);
  } catch (error) {
    console.error('Erreur lors de GET /api/executions/:id :', error);
    updateResult('result-get-executions-id', 'Erreur lors de GET /api/executions/:id. Vérifiez la console.');
  }
});

//EXECUTIONS ----------------------------

// POST /api/executions/:id
document.getElementById('btn-post-executions').addEventListener('click', async () => {
  try {
    const executionId = 1; // Remplacez par un ID valide
    const promptId = document.getElementById('input-prompt-id').value;
    const doc = document.getElementById('input-document').value;
    // const params = JSON.parse(document.getElementById('input-params').value);
    const execution = await fetchData(`/api/executions`, 'POST', { promptId: +promptId, document: doc, params: {} });
    console.log('Exécution créée :', execution);
    updateResult('result-post-executions-id', `POST /api/executions réussi. Vérifiez la console pour les détails.`);
  } catch (error) {
    console.error('Erreur lors de POST /api/executions :', error);
    updateResult('result-post-executions-id', 'Erreur lors de POST /api/executions. Vérifiez la console.');
  }
});


// DELETE /api/executions/:id
document.getElementById('btn-delete-executions-id').addEventListener('click', async () => {
  try {
    const executionId = 1; // Remplacez par un ID valide
    const deletedExecution = await fetchData(`/api/executions/${executionId}`, 'DELETE');
    console.log('Exécution supprimée :', deletedExecution);
    updateResult('result-delete-executions-id', `DELETE /api/executions/${executionId} réussi. Vérifiez la console pour les détails.`);
  } catch (error) {
    console.error('Erreur lors de DELETE /api/executions/:id :', error);
    updateResult('result-delete-executions-id', 'Erreur lors de DELETE /api/executions/:id. Vérifiez la console.');
  }
});
