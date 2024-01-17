# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Debouncing:

typing slow = 200ms
typing fast = 30ms

Perfomance:

iphone pro max = 14 letter _ 1000 = 140000
with debouncing= 3 API calls _ 1000 = 3000

Debouncing applied with 200ms

if difference between 2 key strokes is <200ms - DECLINE API call
200ms make an API call

Cache: time complexity tro search in array = O(n) time complexity tro search in Object = O(1)

[i, ip, iph, iphone]

{ i: ip: iph: iphone: }

new Map();


### Debouncing method used in search suggestions section in head.jsx file

# API call
# make an API request after every key press
# but if the difference between 2 API call is <200ms
# decline the api call

key - i
  - render the component
  - useEffect();
  - start timer => make the API call after 200ms
key - ip 
  - destroy the component(useEffect return method)
  - re-render the component
  - useEffect();
  - start timer => make the API call after 200ms
key - iph 
  - destroy the component(useEffect return method)
  - re-render the component
  - useEffect();
  - start timer => make the API call after 200ms
key - ipho 
  - destroy the component(useEffect return method)
  - re-render the component
  - useEffect();
  - start timer => make the API call after 200ms
key - iphon 
  - destroy the component(useEffect return method)
  - re-render the component
  - useEffect();
  - start timer => make the API call after 200ms
key - iphone 
  - destroy the component(useEffect return method)
  - re-render the component
  - useEffect();
  - start timer => make the API call after 200ms        

