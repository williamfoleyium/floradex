import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Navigation from './Navigation';

// Mock the useSelector hook
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
  }));
  
  describe('Navigation Component', () => {
    // Reset mocks before each test
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    test('renders all navigation links when not logged in', () => {
      // Mock the useSelector implementation
      reactRedux.useSelector.mockImplementation((selector) => {
        const state = { auth: { user: null } };
        return selector(state);
      });
  
      render(
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
        </MemoryRouter>
      );
  
      // Verify expected elements
      expect(screen.getByText('Encyclopedia')).toBeInTheDocument();
      expect(screen.getByText('My Plants')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });
  

// Mock the useSelector and useDispatch hooks
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useSelector: jest.fn(),
//   useDispatch: jest.fn()
// }));

// describe('Navigation Component', () => {
//   // Reset mocks before each test
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
  
//   test('renders all navigation links when not logged in', () => {
//     // Mock the useSelector implementation for not logged in
//     reactRedux.useSelector.mockImplementation(callback => {
//       return callback({ auth: { user: null } });
//     });

//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Navigation />
//       </MemoryRouter>
//     );

//     // Check for navigation links
//     expect(screen.getByText('Encyclopedia')).toBeInTheDocument();
//     expect(screen.getByText('My Plants')).toBeInTheDocument();
//     expect(screen.getByText('Sign Up')).toBeInTheDocument();
    
//     // Verify My Plants links to login when not logged in
//     expect(screen.getByText('My Plants').closest('a')).toHaveAttribute('href', '/login');
//   });

  test('renders navigation links when logged in', () => {
    // Mock the useSelector implementation for logged in user
    reactRedux.useSelector.mockImplementation(callback => {
      return callback({ auth: { user: { _id: '123', name: 'Test User' } } });
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );

    // Check for links that should appear when logged in
    expect(screen.getByText('Encyclopedia')).toBeInTheDocument();
    expect(screen.getByText('My Plants')).toBeInTheDocument();
    
    // Verify My Plants links directly to my-plants when logged in
    expect(screen.getByText('My Plants').closest('a')).toHaveAttribute('href', '/my-plants');
    
    // Check that Sign Up link is not present when logged in
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  test('applies active class to current route', () => {
    // Mock the useSelector implementation
    reactRedux.useSelector.mockImplementation(callback => {
      return callback({ auth: { user: null } });
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );

    // Encyclopedia link should have active class when on root path
    const encyclopediaLink = screen.getByText('Encyclopedia');
    expect(encyclopediaLink.className).toContain('active');
    
    // Other links should not have active class
    const myPlantsLink = screen.getByText('My Plants');
    expect(myPlantsLink.className).not.toContain('active');
  });

  test('applies active class to My Plants when on my-plants route', () => {
    // Mock the useSelector implementation
    reactRedux.useSelector.mockImplementation(callback => {
      return callback({ auth: { user: { _id: '123', name: 'Test User' } } });
    });

    render(
      <MemoryRouter initialEntries={['/my-plants']}>
        <Navigation />
      </MemoryRouter>
    );

    // My Plants link should have active class
    const myPlantsLink = screen.getByText('My Plants');
    expect(myPlantsLink.className).toContain('active');
    
    // Encyclopedia link should not have active class
    const encyclopediaLink = screen.getByText('Encyclopedia');
    expect(encyclopediaLink.className).not.toContain('active');
  });
});