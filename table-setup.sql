CREATE TABLE tasks(
id SERIAL,
task VARCHAR(255),
priority VARCHAR (6),
complete BOOLEAN NOT NULL DEFAULT false);

INSERT INTO "tasks"("task", "priority", "complete")
VALUES
	('Take our recycling','high', false),
	('Buy veggies at farmers market', 'medium', false),
	('Call parents', 'low', false)