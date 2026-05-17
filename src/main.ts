import { section } from "./change-section.js";
import { theme } from "./change-theme.js";
import { menu } from "./menu-responsive.js";
import { Students } from "./students.js";
import { Workouts } from "./workouts.js";
import { Instructors } from "./instructors.js";
import { Utils } from "./utils.js";
import { storage } from "./storage.js";

storage.dom().dashboard();
storage.dom().workout();
storage.dom().student();
storage.dom().instructor();

theme.change();
theme.storage();

section.change();

menu.responsive();

Workouts.actions();
Students.actions();
Instructors.actions();

Utils.closeAllSection();


