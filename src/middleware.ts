import { NextResponse } from 'next/server'; 
 
const middleware = () => NextResponse.redirect(new URL('/', origin)); 

export default middleware

export const config = {matcher: ['/*']};
