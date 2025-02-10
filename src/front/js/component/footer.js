import React from "react";

export const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-black"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div>
        <section>
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Nombre de la empresa</h6>
              <p>
                Somos una plataforma para descubrir, organizar y asistir a eventos en Madrid. 
                Ya sea para aprender algo nuevo, conocer gente o simplemente divertirse, ¡tenemos algo para ti!
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Productos</h6>
              <p>
                <a className="text-blue" href="#!">
                  Eventos en vivo
                </a>
              </p>
              <p>
                <a className="text-blue" href="#!">
                  Webinars
                </a>
              </p>
              <p>
                <a className="text-blue" href="#!">
                  Talleres y cursos
                </a>
              </p>
              <p>
                <a className="text-blue" href="#!">
                  Eventos de networking
                </a>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Enlaces útiles</h6>
              <p>
                <a className="text-blue" href="#!">
                  Tu cuenta
                </a>
              </p>
              <p>
                <a className="text-blue" href="#!">
                  Convertirse en organizador
                </a>
              </p>
              <p>
                <a className="text-blue" href="#!">
                  Precios de entradas
                </a>
              </p>
              <p>
                <a className="text-blue" href="#!">
                  Ayuda
                </a>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contacto</h6>
              <p>
                <i className="fas fa-home mr-3"></i> Madrid, España, 28001
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> contacto@eventosmadrid.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> +34 91 234 5678
              </p>
              <p>
                <i className="fas fa-print mr-3"></i> +34 91 234 5679
              </p>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <div className="p-3">
              © 2025 Copyright:
              <a className="text-blue" href="https://www.eventosmadrid.com/">
                EventosMadrid.com
              </a>
            </div>
          </div>

          <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
            <a
              className="btn btn-outline-light btn-floating m-1"
              role="button"
              href="#!"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              role="button"
              href="#!"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              role="button"
              href="#!"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              role="button"
              href="#!"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};
