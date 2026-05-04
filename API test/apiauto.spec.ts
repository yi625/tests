import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    let postId: number; 

    /*  Notee: JSONPlaceholder is a fake API. It says it creates data, 
      but it doesn't actually save it to their database. 
     */

    test('1. CREATE - Post new data', async ({ request }) => {
        const startTime = Date.now();
        const response = await request.post(`${baseUrl}/posts`, {
            data: {
                title: 'Test Assessment',
                body: 'Testing the create function',
                userId: 1
            }
        });

        // Create success
        expect(response.status()).toBe(201); 
        const data = await response.json();
        
        // Check if the data we sent matches what came back
        expect(data.title).toBe('Test Assessment');
        expect(data.body).toBe('Testing the create function');

        //Validate time taken less than 2sec
        const timeItTook = Date.now() - startTime;
        expect(timeItTook).toBeLessThan(2000);
        
        // Save the new ID, but force it to 1 because of the fake API limitation
        postId = data.id; 
        postId = 1; 
    });

    test('2. READ - Get the data', async ({ request }) => {
        const response = await request.get(`${baseUrl}/posts/${postId}`);
        expect(response.status()).toBe(200); 
        
        const data = await response.json();
        
        // Verify the correct ID back and numbers
        expect(data.id).toBe(postId);
        expect(typeof data.id).toBe('number');
        // Verify tittle to be string and not empty
        expect(typeof data.title).toBe('string')
        expect(data.title.length).toBeGreaterThan(0);
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

    test('5. Test return Error for ID', async ({ request }) => {
        const response = await request.get(`${baseUrl}/posts/999999`);
        
        // Expect return 404 Not Found due to id not exist
        expect(response.status()).toBe(404);
    });

    test('6. Test return Error for ID with alphabet', async ({ request }) => {
        const response = await request.get(`${baseUrl}/posts/abc`);
    
        // Expect return error 404 due to id only alllow number
        expect(response.status()).toBe(404);
    });

    test('7. Test return Error with wrong http', async ({ request }) => {
        const response = await request.post(`${baseUrl}/posts/1`, {
            data: { title: 'This should fail' }
        });
        
        // Expect return error 404 
        expect(response.status()).toBe(404); 
    });

});