'use server'
import connectDB from "@/config/database"
import cloudinary from "@/config/cloudnary"
import Property from "@/models/property"
import { getSessionUser } from "@/utils/getSessionUser"
