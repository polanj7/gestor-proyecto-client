import React from 'react';

export default function NotFount404() {
  return (    
    <>


    <section className="content">
        <div className="error-page">
          <h2 className="headline text-warning">404</h2>
          <div className="error-content">
            <h3><i className="fas fa-exclamation-triangle text-warning" /> ¡UPS! Página no encontrada.</h3>
            <p>
              No pudimos encontrar la página que estabas buscando.             
            </p>
          </div>
          {/* /.error-content */}
        </div>
        {/* /.error-page */}
      </section>
    </>
     
  );
}
