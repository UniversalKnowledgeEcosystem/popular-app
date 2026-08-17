import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = decodeURIComponent(request.nextUrl.pathname).toLowerCase();

  // Compatibilidade com versões antigas do cardápio que ainda apontam
  // os dois primeiros produtos para imagens de hambúrguer.
  if (pathname === "/hamburguer 1.png") {
    const url = request.nextUrl.clone();
    url.pathname = "/misto quente.png";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/hamburguer 2.png") {
    const url = request.nextUrl.clone();
    url.pathname = "/misto especial.png";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hamburguer%201.png", "/hamburguer%202.png", "/hamburguer 1.png", "/hamburguer 2.png"],
};
