import React from "react";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-black"
      style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
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
                <Link className="text-blue" to="/results">
                  Eventos en vivo
                </Link>
              </p>
              <p>
                <Link className="text-blue" to="/results">
                  Talleres y cursos
                </Link>
              </p>
              <p>
                <Link className="text-blue" to="/results">
                  Eventos de networking
                </Link>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Enlaces útiles</h6>
              <p>
                <Link className="text-blue" to="/result">
                  Tu cuenta
                </Link>
              </p>
              <p>
                <Link className="text-blue" to="/result">
                  Convertirse en organizador
                </Link>
              </p>
              <p>
                <Link className="text-blue" to="/result">
                  Ayuda
                </Link>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contacto</h6>
              <p>
                <i className="fas fa-home mr-3"></i> Madrid, España, 28001
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> contacto@eventos.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> +34 91 234 5678
              </p>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <div className="p-3">
              © 2025 Copyright:
              <Link className="text-blue" to="/">
                Eventos.com
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};
