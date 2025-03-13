import { MegaMenu } from "primereact/megamenu"
import "./MegaMenu.css"

export default function Megamenu() {
  const items = [
    {
      label: "Quién Soy",
      icon: "pi pi-user",
      command: () => {
        window.open("https://xaremontes.github.io/Portafolioxm/Personal/index.html", "_blank")
      },
    },
    {
      label: "Sobre Mí",
      icon: "pi pi-info-circle",
      command: () => {
        window.open("https://xaremontes.github.io/Portafolioxm/Personal/about.html", "_blank")
      },
    },
    {
      label: "Contacto",
      icon: "pi pi-envelope",
      command: () => {
        window.open("https://xaremontes.github.io/Portafolioxm/Personal/contact.html", "_blank")
      },
    },
  ]

  return (
    <div className="card megamenu-container">
      <MegaMenu
        model={items}
        className="custom-megamenu"
        style={{ width: "100%" }}
        orientation="horizontal"
        mobileBreakpoint={99999} // Evita el menú móvil
      />
    </div>
  )
}
