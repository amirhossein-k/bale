export function startHandler() {
  return async (ctx) => {
    // پیام خوش‌آمد + درخواست اسم (در caption)
    await ctx.reply(
      "👋 خوش آمدی! بیا پروفایلت رو بسازیم.\n\n📌 مرحله ۱ از ۵: لطفاً اسمت رو ارسال کن.",
    );
  };
}
