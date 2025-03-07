import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { useDevice } from '@deriv-com/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageError from '../index';

jest.mock('@deriv-com/ui', () => ({
    ...jest.requireActual('@deriv-com/ui'),
    useDevice: jest.fn(() => {
        return {
            isMobile: false,
        };
    }),
}));

describe('<PageError/>', () => {
    const renderWithRouter = (component: React.ReactElement) => {
        const history = createMemoryHistory();
        return render(
            <Router location={history.location} navigator={history}>
                {component}
            </Router>
        );
    };

    const mockSetError = jest.fn();
    const mockButtonOnClick = jest.fn();

    const pageErrorDefaultProps = {
        header: 'Error',
        messages: ['Test error message'],
        redirect_labels: ['Go back'],
        redirect_urls: ['/test'],
        should_clear_error_on_click: true,
        buttonOnClick: mockButtonOnClick,
        setError: mockSetError,
        should_redirect: true,
    };

    it('Should render the error message correctly', () => {
        renderWithRouter(<PageError {...pageErrorDefaultProps} />);

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('Should call buttonOnClick() upon button click when should_redirect and should_clear_error_on_click equals to false', async () => {
        const { buttonOnClick } = pageErrorDefaultProps;

        render(
            <PageError
                {...pageErrorDefaultProps}
                should_clear_error_on_click={false}
                buttonOnClick={buttonOnClick}
                should_redirect={false}
            />
        );

        expect(screen.getByRole('button')).toHaveClass('dc-page-error__btn--no-redirect');
        await userEvent.click(screen.getByRole('button'));
        expect(buttonOnClick).toHaveBeenCalledTimes(1);
    });

    it('Should render the redirect button correctly', () => {
        renderWithRouter(<PageError {...{ ...pageErrorDefaultProps, redirect_urls: ['/'] }} />);

        const button = screen.getByText('Go back');
        expect(button).toBeInTheDocument();
    });

    it('Should call setError() when redirect button gets clicked', async () => {
        const { setError } = pageErrorDefaultProps;
        renderWithRouter(<PageError {...pageErrorDefaultProps} />);

        const link = screen.getByRole('link');

        await userEvent.click(link);
        expect(setError).toHaveBeenCalledTimes(1);
    });

    it('Should call setError() when redirect button gets clicked and should_redirect did not pass', async () => {
        const { setError } = pageErrorDefaultProps;
        renderWithRouter(<PageError {...pageErrorDefaultProps} should_redirect={undefined} />);

        const link = screen.getByRole('link');

        await userEvent.click(link);
        expect(setError).toHaveBeenCalled();
    });

    it('Should call setError when button is clicked and should_clear_error_on_click is true', async () => {
        renderWithRouter(<PageError {...pageErrorDefaultProps} />);

        const button = screen.getByText('Go back');
        await userEvent.click(button);

        expect(mockSetError).toHaveBeenCalledWith(false, null);
    });

    it('Should not show the button when redirect equals to false and redirect_labels has nothing to display', () => {
        const { buttonOnClick } = pageErrorDefaultProps;
        renderWithRouter(
            <PageError
                {...{ ...pageErrorDefaultProps, redirect_labels: [''] }}
                should_clear_error_on_click={false}
                buttonOnClick={buttonOnClick}
                should_redirect={false}
            />
        );

        const page_error = screen.getByTestId('dc-page-error__btn-wrapper');

        expect(page_error).toHaveTextContent('');
    });

    it('Should show on mobile version text size of the error equals to "xs" and not show the button when redirect equals to false and redirect_labels has one element in the array', () => {
        const { buttonOnClick } = pageErrorDefaultProps;

        (useDevice as jest.Mock).mockReturnValueOnce({
            isMobile: true,
        });

        renderWithRouter(
            <PageError
                {...{ ...pageErrorDefaultProps, redirect_labels: ['Some redirect label'] }}
                should_clear_error_on_click={false}
                buttonOnClick={buttonOnClick}
                should_redirect={false}
            />
        );

        const redirect_label = screen.getByText('Some redirect label');

        expect(redirect_label).toBeInTheDocument();
        expect(redirect_label).toHaveStyle(`--text-size: var(--text-size-xs)`);
    });

    it('If image_url is passed we should render the image', () => {
        renderWithRouter(<PageError {...pageErrorDefaultProps} image_url={'test-image-url.png'} />);

        const image = screen.getByAltText('404');

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test-image-url.png');
    });

    it('Should show on mobile version text size of the error heading equals to "s" when image_url is passed ', () => {
        (useDevice as jest.Mock).mockReturnValueOnce({
            isMobile: true,
        });

        renderWithRouter(<PageError {...pageErrorDefaultProps} image_url={'test-image-url.png'} />);

        const heading = screen.getByRole('heading', { level: 3 });

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveStyle('--text-size: var(--text-size-s)');
    });
});
