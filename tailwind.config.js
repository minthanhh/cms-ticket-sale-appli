/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    important: true,
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
            colors: {
                'navigation': '#756a64',
                'secondary': '#1e0d03',
                'placeholder': '#afa5a2',
                'copyRight': '#8b817c',
                'borderButton': '#ff993b',
                'expired': '#f8ebe8',
                'primary': '#f15a29',
                'italic': '#a59e9a',
                'ins-table-head-background': 'var(--table-head-background)',
                'ins-table-odd-row-background': 'var(--table-odd-row-background)',
                'ins-table-even-row-background': 'var(--table-even-row-background)',
            },
            textColor: {
                used: '#919dba',
                notUsedYet: '#03ac00',
                expired: '#fd5959',
                table: '#61554f',
                input: '#b6b1af',
            },
            backgroundColor: {
                primary: '#f15a29',
                main: '#f9f6f4',
                bgUsed: '#eaf1f8',
                bgNotUsedYet: '#def6e0',
                bgExpired: '#f8ebe8',
                input: '#f7f7f8',

                expired: '#fd5959',
                notUsedYet: '#03ac00',
                used: '#919dba',
            },
            borderColor: {
                used: '#919dba',
                notUsedYet: '#03ac00',
                expired: '#fd5959',
                input: '#a5a8b1',
            },
            placeholderColor: {
                textPlaceholder: '#c0c3c9',
            },
            height: {
                'ins-header-height': 'var(--header-height)',
                'ins-content-height': 'var(--content-height)',
            },
            margin: {
                'ins-content-margin': 'var(--content-margin)',
            },
        },
    },
    plugins: [require('daisyui')],
}
