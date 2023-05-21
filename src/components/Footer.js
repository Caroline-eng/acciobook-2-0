import "../components/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <ul>
          <li>
            <a href="/sobre">Sobre nós</a>
          </li>
          <li>
            <a href="/politica-privacidade">Política de Privacidade</a>
          </li>
          <li>
            <a href="/termos-uso">Termos de Uso</a>
          </li>
          <li>
            <a href="/faq">Perguntas Frequentes</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
