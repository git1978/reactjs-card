import React, { useState } from 'react';
import './Copim.scss'; // استيراد ملف SCSS للمكون
import DragDropFileUpload from "../Dragdrop/DragDropFileUpload";

const Copim = () => {
  const [isConfirmedIdentity, setIsConfirmedIdentity] = useState(false);
  const [isConfirmedDocument, setIsConfirmedDocument] = useState(false);

  const handleIdentityChange = (e) => {
    setIsConfirmedIdentity(e.target.checked);
  };

  const handleDocumentChange = (e) => {
    setIsConfirmedDocument(e.target.checked);
  };

  return (
    <div className="container">
      <div className="main-side">
        <div className="copim-icon-book">
          <img src="/images/book.png" alt="book" className="icon" />
        </div>
        <div className="copim-title">Activer vos droits de validation</div>
        <div className="copim-sous-titre">En attente des documents</div>
        <div className="copim-text-droit">
          <p>
            Afin d’activer vos droits de validation, nous devons nous assurer de votre identité. Nous vous
            remercions donc de télécharger une pièce d’identité en format électronique, qui sera ensuite
            transmise à nos équipes pour validation.
          </p>
          <p>
            Assurez-vous que la pièce d’identité téléchargée est bien lisible et complète. Toutes les mesures
            nécessaires pour assurer la confidentialité et la sécurité de vos informations personnelles seront prises.
          </p>
          <p>
            Une fois votre pièce d’identité validée, vous serez informé de la suite de la procédure. Merci pour
            votre collaboration et votre compréhension.
          </p>
        </div>
        
        <div class="row"><div class="col-6">
          <img src="/images/carte-identite.png" alt="Carte d’identité" />
            Carte d’identité
            </div>
          <div class="col-6">
            <img src="/images/passport.png" alt="Passeport" />
            Passeport
          </div>
        </div>


        <div className="mt-3">
          Télécharger une pièce d’identité
        </div>
        <DragDropFileUpload />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="confirmIdentity"
              checked={isConfirmedIdentity}
              onChange={handleIdentityChange}
            />
            <label className="form-check-label" htmlFor="confirmIdentity">
              Je confirme que mon identité est bien à #nom du compte# (obligatoire)
            </label>
          </div>
          <form>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="confirmDocument"
              checked={isConfirmedDocument}
              onChange={handleDocumentChange}
            />
            <label className="form-check-label" htmlFor="confirmDocument">
              Je confirme que le document chargé est bien ma pièce d’identité (obligatoire)
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Copim;
