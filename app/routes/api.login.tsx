import type { ActionFunctionArgs } from 'react-router';

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return Response.json({ success: false, error: 'Please enter email and password.' }, { status: 400 });
  }

  try {
    const tokenResponse = await context.storefront.mutate(
      `#graphql
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              field
              message
              code
            }
          }
        }
      `,
      {
        variables: {
          input: { email, password },
        },
      },
    );

    const tokenCreate = tokenResponse.customerAccessTokenCreate;

    if (tokenCreate?.customerUserErrors?.length) {
      return Response.json(
        { success: false, error: tokenCreate.customerUserErrors[0].message },
        { status: 400 },
      );
    }

    const accessToken = tokenCreate?.customerAccessToken?.accessToken;

    if (!accessToken) {
      return Response.json({ success: false, error: 'Invalid credentials.' }, { status: 400 });
    }

    // Now fetch the customer details
    const customerResponse = await context.storefront.query(
      `#graphql
        query getCustomer($customerAccessToken: String!) {
          customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            email
            phone
          }
        }
      `,
      {
        variables: { customerAccessToken: accessToken },
      },
    );

    const customer = customerResponse.customer;

    return Response.json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error('Customer login error:', error);
    return Response.json(
      { success: false, error: 'An error occurred during login. Please try again.' },
      { status: 500 },
    );
  }
}
