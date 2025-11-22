import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/src/assets/images/logo.svg" alt="apple logox" />
        <p className="font-bold">Vansh's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
            {navIcons.map(({ id,img }) => (
                <li key = {id}>
                    <img src={img} className="icon-hover" alt={`icon-${id}`} />
                </li>
            ))}  
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
