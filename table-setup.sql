CREATE TABLE tasks(
id SERIAL,
task VARCHAR(255),
complete BOOLEAN NOT NULL DEFAULT false);

INSERT INTO "tasks"("task", "complete")
VALUES
	('Take our recycling', false),
	('Buy veggies at farmers market', false),
	('Call parents', false)