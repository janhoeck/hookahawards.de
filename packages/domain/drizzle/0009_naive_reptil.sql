CREATE TABLE "clip_streamers" (
	"clip_id" uuid NOT NULL,
	"streamer_id" uuid NOT NULL,
	CONSTRAINT "clip_streamers_clip_id_streamer_id_pk" PRIMARY KEY("clip_id","streamer_id")
);
--> statement-breakpoint
ALTER TABLE "clip_streamers" ADD CONSTRAINT "clip_streamers_clip_id_clips_id_fk" FOREIGN KEY ("clip_id") REFERENCES "public"."clips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clip_streamers" ADD CONSTRAINT "clip_streamers_streamer_id_streamers_id_fk" FOREIGN KEY ("streamer_id") REFERENCES "public"."streamers"("id") ON DELETE cascade ON UPDATE no action;