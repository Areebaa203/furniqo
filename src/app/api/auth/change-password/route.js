import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { changePasswordSchema } from "@/lib/validations/auth";

/**
 * POST /api/auth/change-password
 * Body: { currentPassword, password, confirmPassword }
 *
 * Verifies the current password, then updates to the new password for the signed-in user.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const result = changePasswordSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 422 }
      );
    }

    const { currentPassword, password } = result.data;
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to change your password." },
        { status: 401 }
      );
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      if (updateError.message.toLowerCase().includes("same password")) {
        return NextResponse.json(
          {
            success: false,
            message: "New password must be different from your current password.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, message: updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your password has been updated.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/auth/change-password]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
