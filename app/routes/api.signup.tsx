import type { ActionFunctionArgs } from 'react-router';

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const fullName = String(formData.get('fullName') || '');
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  if (!fullName || !email || !password || !confirmPassword) {
    return Response.json(
      {
        success: false,
        error: 'Please fill in all fields.',
      },
      { status: 400 },
    );
  }

  if (password !== confirmPassword) {
    return Response.json(
      {
        success: false,
        error: 'Passwords do not match.',
      },
      { status: 400 },
    );
  }

  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  try {
    const response = await context.storefront.mutate(
      `#graphql
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              firstName
              lastName
              email
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
          input: {
            firstName,
            lastName,
            email,
            password,
          },
        },
      },
    );

    const customerCreate = response.customerCreate;

    if (customerCreate?.customerUserErrors?.length) {
      return Response.json(
        {
          success: false,
          errors: customerCreate.customerUserErrors,
        },
        { status: 400 },
      );
    }

    return Response.json({
      success: true,
      customer: customerCreate?.customer,
    });
  } catch (error) {
    console.error('Customer create error:', error);
    return Response.json(
      {
        success: false,
        error: 'An error occurred while creating your account. Please try again later.',
      },
      { status: 500 },
    );
  }
}
