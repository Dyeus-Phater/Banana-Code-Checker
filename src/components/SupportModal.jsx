import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const SupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>About & Support</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <h3>GitHub Repository</h3>
          <a href="https://github.com/Dyeus-Phater/Banana-Code-Checker" target="_blank" rel="noopener noreferrer">
            https://github.com/Dyeus-Phater/Banana-Code-Checker
          </a>
          
          <h3>Support via Lightning Network</h3>
          <div className="qr-code-container">
            <QRCodeSVG 
              value="lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhgctdv4exjcmgv9exgdek8pvr5f" 
              size={200} 
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </div>
          <div className="lightning-address">
          lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhgctdv4exjcmgv9exgdek8pvr5f
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;