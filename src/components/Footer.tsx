import { logo } from '../assets'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <img src={logo} alt="Matrixo — Free Your Mind" />
        <p>
          Matrixo Software Technology PLC
          <br />
          Gerji Mebrat, Bole Sub-city, Addis Ababa, Ethiopia
          <br />© {year} Matrixo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
