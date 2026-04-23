import { section } from "./change-section.js";
import { theme } from "./change-theme.js";
import { menu } from "./menu-responsive.js";
import { Students } from "./students.js";
import { Workouts } from "./workouts.js";
import { Instructors } from "./instructors.js";
import { sectionCloseAllActionsOfCategory } from "./utils.js";

section.change();
menu.responsive();
theme.change();
theme.storage();
Workouts.actions();
Students.actions();
Instructors.actions();

sectionCloseAllActionsOfCategory();