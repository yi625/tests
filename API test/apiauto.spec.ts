import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    let postId: number; 

    /* * Note: JSONPlaceholder is a fake API. It says it creates data, 
     * but it doesn't actually save it to their database. 
     * Because of this, we will use ID 1 for the Read, Update, and Delete steps 
     */

    test('1. CREATE - Post new data', async ({ request }) => {
        const response = await request.post(`${baseUrl}/posts`, {
            data: {
                title: 'Test Assessment',
                body: 'Testing the create function',
                userId: 1
            }
        });

        // 1. Create success
        expect(response.status()).toBe(201); 
        
        const data = await response.json();
        
        // 2. Check if the data we sent matches what came back
        expect(data.title).toBe('Test Assessment');
        expect(data.body).toBe('Testing the create function');
        
        // Save the new ID, but force it to 1 because of the fake API limitation
        postId = data.id; 
        postId = 1; 
    });

    test('2. READ - Get the data', async ({ request }) => {
        const response = await request.get(`${baseUrl}/posts/${postId}`);
        expect(response.status()).toBe(200); 
        
        const data = await response.json();
        
        // Just verify we got the right ID back
        expect(data.id).toBe(postId);
    });

    test('3. UPDATE - Change the title', async ({ request }) => {
        const response = await request.patch(`${baseUrl}/posts/${postId}`, {
            data: { 
                title: 'This is the new updated title' 
            }
        });

        expect(response.status()).toBe(200);
        const data = await response.json();

        // Verify the title actually changed,check in response
        expect(data.title).toBe('This is the new updated title'); 

        //database not updated so still seeing default value
        const getResponse = await request.get(`${baseUrl}/posts/${postId}`); 
    });

    test('4. DELETE - Delete the post', async ({ request }) => {
        //Check in response, will show empty{}
        const response = await request.delete(`${baseUrl}/posts/${postId}`);
        expect(response.status()).toBe(200);

        //Call get to verify data but database didnt update so seeing the default value 
        const getResponse = await request.get(`${baseUrl}/posts/${postId}`);

    });

    test('5. NEGATIVE TEST - Try to get a fake ID', async ({ request }) => {
        // ID 999999 does not exist
        const response = await request.get(`${baseUrl}/posts/999999`);
        
        // It should return 404 Not Found
        expect(response.status()).toBe(404);
    });
});