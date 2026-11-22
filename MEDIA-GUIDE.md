# 📷🎬 How to add your photos and videos

Every photo and video slot on the site is listed in **`portfolio.config.ts`**.
Until you add a file, the site shows a dashed **"Add photo"** box that tells you the exact
file path it's waiting for.

---

## 1. Where each photo goes

| Page | Photos folder | Videos folder |
| --- | --- | --- |
| Robotics 2026 | `public/images/robotics/2026/` | `public/videos/robotics/2026/` |
| Robotics 2025 | `public/images/robotics/2025/` | `public/videos/robotics/2025/` |
| Robotics 2024 | `public/images/robotics/2024/` | `public/videos/robotics/2024/` |
| Robotics 2023 | `public/images/robotics/2023/` (create it) | |
| CAD | `public/images/cad/` | |
| Manufacturing | `public/images/manufacturing/` | `public/videos/manufacturing/` |
| Electronics | `public/images/electronics/` | |
| Awards gallery | `public/images/awards/` | |

Your originals live in `Portfolio matarial/` (not uploaded to git — see `.gitignore`).
The site uses resized copies (max 1600 px, ~500 KB) and videos converted to MP4 (H.264),
because iPhone `.MOV`/`.HEIC` files don't play in every browser.

**Converting a new file on a Mac** (Terminal, inside the project folder):

```bash
# photo (.HEIC / .JPG / .PNG) → web .jpg
sips -s format jpeg -s formatOptions 72 -Z 1600 "Portfolio matarial/MyPhoto.HEIC" --out public/images/cad/my-photo.jpg

# video (.MOV / .MP4) → web .mp4 (use Preset1920x1080 for vertical phone videos)
avconvert -s "Portfolio matarial/MyVideo.MOV" -p Preset1280x720 -o public/videos/manufacturing/my-video.mp4
```

**Steps to add a photo:**

1. Convert/resize it (command above, or see *Size* below) into the right folder.
2. Add a line for it in that section's `media: [...]` list in `portfolio.config.ts`
   (each list has a commented example line to copy).
3. Refresh the page.

`.jpg`, `.jpeg`, `.webp` and `.png` all work: if the config says `photo-1.jpg` but you add
`photo-1.webp`, the site finds it automatically.

### Size (keeps the site fast)

- **Under 500 KB**, **max 1600 px wide**.
- On a Mac: open in **Preview → File → Export…** → Format **JPEG**, drag *Quality* to about
  70 %. Or use **Tools → Adjust Size** to set the width to 1600.
- Or drag it into <https://squoosh.app> and download as **WebP**.

---

## 2. Adding a video (YouTube)

1. Upload the video to YouTube and set visibility to **Unlisted**
   (only people with the link can see it).
2. Under the video click **Share → Copy**. You get a link like `https://youtu.be/AbC123xyz_0`.
3. Open `portfolio.config.ts`, find the empty video slot, and paste the link between the quotes:

```ts
// before
{ video: "", caption: "2025 match video — paste a YouTube link", shape: "wide" },

// after
{ video: "https://youtu.be/AbC123xyz_0", caption: "Quarter-final match, 2025", shape: "wide" },
```

Any YouTube link works: `youtu.be/…`, `youtube.com/watch?v=…`, or `youtube.com/shorts/…`.
The thumbnail and the full-screen player are created automatically.

> **Small clip instead of YouTube?** Put an `.mp4` in `public/videos/` and write
> `video: "/videos/cnc-timelapse.mp4"`. Keep it short (under ~10 MB). YouTube is better for
> anything longer.

---

## 3. Adding *more* photos or videos

Copy one line, paste it below, and change the file name and caption:

```ts
media: [
  { photo: "/images/robotics/2025/photo-1.jpg", caption: "Me with the 2025 robot", shape: "tall" },
  { photo: "/images/robotics/2025/photo-2.jpg", caption: "2025 robot", shape: "square" },
  { photo: "/images/robotics/2025/pit.jpg", caption: "In the pits", shape: "wide" },   // ← new
  { video: "https://youtu.be/AbC123xyz_0", caption: "Finals match", shape: "wide" },
],
```

Don't forget the **comma** at the end of each line.

### `shape` — how the card looks

| shape | ratio | good for |
| --- | --- | --- |
| `"wide"` | 16 : 9 | landscape videos, wide photos |
| `"landscape"` | 4 : 3 | CAD screenshots, camera photos |
| `"square"` | 1 : 1 | machined parts, close-ups |
| `"tall"` | 4 : 5 | slightly vertical photos |
| `"portrait"` | 3 : 4 | phone photos & vertical phone videos |

The photo is cropped to fit, so pick the shape closest to the original photo.

To remove a slot, delete its line.

---

## 4. Before you publish

At the top of `portfolio.config.ts` set:

```ts
showMissingMediaPlaceholders: false,
```

Any slot you haven't filled is then hidden instead of showing an "Add photo" box.
