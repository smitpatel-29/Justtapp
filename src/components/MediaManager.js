"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, X, Check, Image as ImageIcon } from "lucide-react";
import styles from "./MediaManager.module.css";

export default function MediaManager({ isOpen, onClose, onSelect }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setImages(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // Refresh list
        fetchImages();
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageClick = (url) => {
    if (onSelect) {
      onSelect(url);
    } else {
      // Just copy to clipboard
      navigator.clipboard.writeText(window.location.origin + url);
      alert("Image URL copied to clipboard!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Media Library</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Upload Area */}
          <div
            className={styles.uploadArea}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleUpload}
              accept="image/*"
            />
            <Upload size={48} className={styles.uploadIcon} />
            <p className={styles.uploadText}>
              {uploading ? "Uploading..." : "Click to upload specific image"}
            </p>
          </div>

          <div className={styles.grid}>
            {images.map((img, idx) => (
              <div
                key={idx}
                className={styles.mediaItem}
                onClick={() => handleImageClick(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className={styles.thumbnail}
                />
                <div className={styles.overlayAction}>
                  <span className={styles.copyLabel}>
                    {onSelect ? "Select" : "Copy URL"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
