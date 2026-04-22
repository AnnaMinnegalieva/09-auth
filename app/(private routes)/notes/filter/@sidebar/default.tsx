import Link from "next/link";
import css from "./SidebarNotes.module.css";

const SidebarNotes = () => {
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <>
      <Link href="/notes/action/create" className={css.menuLink}>
        Create note +
      </Link>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag.toLowerCase()}`}
              className={css.menuLink}
            >
              {tag === "All" ? "All notes" : tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarNotes;