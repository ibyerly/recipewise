# RecipeWise

> **Working title:** RecipeWise\
> **Product concept:** Save recipes from anywhere, adapt them to your
> needs, understand their nutrition, and track what you eat.

RecipeWise is a cross-platform recipe and nutrition app for people who
want to enjoy the food they love while making informed choices about
ingredients and nutrition. Users can import recipes from websites and
social platforms, use AI to interpret recipe captions and videos when
possible, make ingredient substitutions based on their goals and
restrictions, compare nutrition before and after changes, and log meals
in a daily food diary.

This README is the initial product and technical blueprint. It is
intentionally structured to support a personal-project MVP first, while
leaving room for a more capable web and mobile product.

------------------------------------------------------------------------

## Table of contents

-   [1. Product vision](#1-product-vision)
-   [2. Goals and guiding principles](#2-goals-and-guiding-principles)
-   [3. Target users and use cases](#3-target-users-and-use-cases)
-   [4. Core features](#4-core-features)
-   [5. Key user journeys](#5-key-user-journeys)
-   [6. MVP scope](#6-mvp-scope)
-   [7. Functional requirements](#7-functional-requirements)
-   [8. Nutrition and substitution
    approach](#8-nutrition-and-substitution-approach)
-   [9. AI and recipe-import approach](#9-ai-and-recipe-import-approach)
-   [10. Suggested technical
    architecture](#10-suggested-technical-architecture)
-   [11. Data model](#11-data-model)
-   [12. Privacy, safety, and content
    considerations](#12-privacy-safety-and-content-considerations)
-   [13. Testing and quality
    assurance](#13-testing-and-quality-assurance)
-   [14. Development roadmap](#14-development-roadmap)
-   [15. Success measures](#15-success-measures)
-   [16. Open product decisions](#16-open-product-decisions)

------------------------------------------------------------------------

## 1. Product vision

**Save any recipe. Make it work for you. Know what you're eating.**

RecipeWise should make it easy to move from recipe inspiration to a
practical meal that fits a person's preferences, dietary needs, and
nutrition goals.

A user might see a cookie recipe on Instagram, import it by sharing a
link or uploading a screenshot, and have the app extract the ingredients
and instructions. They can then ask for substitutions that reduce
saturated fat, lower added sugar, or accommodate an allergy. The app
explains the trade-offs, updates the ingredient quantities, recalculates
the recipe's nutrition, and saves the adapted version. When the user
makes or eats it, they can add it to that day's food diary.

### Product pillars

1.  **Capture:** Bring recipes into one searchable personal library from
    a variety of sources.
2.  **Adapt:** Make ingredient substitutions based on user-selected
    goals, preferences, and restrictions.
3.  **Understand:** Show estimated nutrition for the original recipe and
    each adapted version.
4.  **Track:** Make it easy to record meals and see daily nutrition
    totals and history.
5.  **Personalize:** Remember a user's saved recipes, dietary
    preferences, allergies, goals, and prior adaptations.

------------------------------------------------------------------------

## 2. Goals and guiding principles

### Goals

-   Support importing recipes from recipe websites, food blogs, NYT
    Cooking, Instagram, and other social platforms where technically and
    legally possible.
-   Support URL import, social sharing, screenshots/photos, and manual
    recipe entry.
-   Use AI to interpret captions, on-screen text, and video content when
    accessible.
-   Let users choose the reason for a substitution, such as allergies,
    dietary preferences, lower calories, higher protein, weight
    management, or muscle gain.
-   Show all requested nutrition values, including calories, protein,
    carbohydrates, fat, saturated fat, fiber, sugar, and sodium.
-   Compare the original recipe with the adapted recipe.
-   Provide a daily food log for recipes, meals, snacks, and individual
    foods.
-   Synchronize a user's account, recipe library, preferences, and food
    diary across web and mobile.

### Guiding principles

-   **User choice first:** Never silently change a recipe. Explain
    suggestions and let the user accept, reject, or edit them.
-   **Taste and function matter:** A substitution should consider
    texture, flavor, moisture, structure, cooking temperature, and
    recipe type---not nutrition alone.
-   **Be transparent:** Clearly label estimated nutrition, uncertain
    recipe extraction, and AI-generated suggestions.
-   **Make logging quick:** Logging a meal should take only a few taps.
-   **Do not moralize food:** Present nutrition information neutrally.
    Avoid labeling foods as "good," "bad," or "guilt-free."
-   **Respect source content:** Preserve attribution and links; do not
    bypass paywalls or access restrictions.

------------------------------------------------------------------------

## 3. Target users and use cases

### Primary users

People who enjoy finding recipes online and want a convenient way to
save, customize, and understand them. They may have specific dietary
restrictions or goals, or simply want to make more informed ingredient
choices.

### Example use cases

-   A home baker wants to see whether coconut oil can replace butter in
    a muffin recipe and how the change affects nutrition and texture.
-   A user with a dairy allergy wants dairy-free alternatives and needs
    potentially unsafe ingredients clearly flagged.
-   Someone working toward a higher-protein diet wants suggestions for
    increasing protein in a pasta dish.
-   A user wants to reduce added sugar without making a dessert taste
    substantially different.
-   Someone wants to save an Instagram recipe without manually typing
    every ingredient.
-   A user wants to log a recipe they cooked for dinner and include its
    nutrition in their daily totals.
-   A user wants to look back at what they cooked and ate last week.

------------------------------------------------------------------------

## 4. Core features

### 4.1 Recipe import and capture

Users can add a recipe through:

-   **Paste a URL:** Import from supported recipe websites and public
    social posts.
-   **Share to RecipeWise:** Receive a link from the iOS or Android
    share menu.
-   **Upload a screenshot or photo:** Use OCR and AI to extract
    ingredients, quantities, and instructions.
-   **Import a video:** Analyze accessible video frames, captions,
    speech/transcription, and accompanying post text to identify
    ingredients and steps.
-   **Manual entry:** Create or edit a recipe from scratch.

After import, show a review screen where the user can correct the title,
serving count, ingredient list, quantities, units, and instructions. Do
not treat uncertain extraction as verified fact.

**Important:** Some platforms restrict automated access, and some
content is private, paywalled, login-gated, or unavailable to external
tools. The app should use permitted access methods and provide
screenshot, share-sheet, or manual-entry fallbacks. It must not promise
that every Instagram, NYT Cooking, or other link can be imported
automatically.

### 4.2 Personal recipe library

Each user can:

-   Save original and adapted recipes.
-   Search by recipe name, ingredient, source, or tag.
-   Filter by meal type, dietary preference, preparation time, and
    favorites.
-   Add personal notes, ratings, and tags.
-   View the original source link and attribution.
-   Duplicate an existing recipe to create a new variation.
-   See when a recipe was imported, modified, cooked, or logged.

### 4.3 AI-powered ingredient substitutions

Users choose what they want to optimize for. The app should support
multiple goals at once.

Possible goals and constraints:

-   Food allergies and intolerances.
-   Dietary patterns or preferences, such as vegetarian, vegan,
    dairy-free, or gluten-free.
-   Lower calories or support for weight management.
-   Higher calories or support for weight gain.
-   Higher protein.
-   Lower added sugar.
-   Lower saturated fat.
-   Higher fiber.
-   Lower sodium.
-   User-defined ingredient exclusions or preferences.

For each proposed substitution, show:

-   Original ingredient and quantity.
-   Suggested replacement and quantity.
-   Why it was suggested.
-   Expected nutrition change.
-   Expected impact on taste, texture, moisture, and cooking behavior.
-   Confidence or uncertainty, where appropriate.
-   Any recipe-specific caveats.

Users can accept or reject each suggestion, edit quantities, or ask for
another option. The app should preserve the original recipe and save
adaptations as separate versions.

**Example:** Replace butter with coconut oil in a baking recipe. The app
should explain that the swap may work in some recipes but can change
flavor and texture, and that the nutrition profile is not automatically
healthier in every respect. The user should see the calculated
difference rather than receiving a blanket "healthy" label.

### 4.4 Nutrition and macro calculator

Calculate nutrition for the original recipe and every saved adapted
version.

Required values:

-   Calories
-   Protein
-   Total carbohydrates
-   Total fat
-   Saturated fat
-   Fiber
-   Total sugar
-   Sodium

Display values:

-   Per serving.
-   For the entire recipe.
-   For a user-adjusted serving size.
-   As an original-versus-adapted comparison.

Where data is available, distinguish added sugar from total sugar. Show
the source or data basis for nutrition estimates and flag missing or
ambiguous ingredient matches.

### 4.5 Daily food and meal tracking

Provide a full food diary---not just a list of recipes.

Users can log:

-   A saved recipe they cooked or ate.
-   A specific adapted recipe version.
-   Individual foods and snacks.
-   Meals such as breakfast, lunch, dinner, and snacks.
-   Portion size and number of servings.
-   Optional meal time, date, and notes.

The app should calculate daily totals from logged portions and show
progress against user-defined nutrition targets. Users should be able to
edit or delete an entry and review past days.

**Separate recipe activity from food consumption:** Importing or saving
a recipe does not mean the user ate it. The app can record when a recipe
was saved, cooked, and eaten, but only an explicit meal-log action
should add nutrition to the daily intake totals.

### 4.6 User profile and personalization

Each account can store:

-   Dietary preferences and eating patterns.
-   Allergies and intolerances.
-   Ingredients to avoid or favor.
-   Nutrition goals and optional daily targets.
-   Preferred units (US customary or metric).
-   Saved recipes and recipe versions.
-   Food diary and meal history.

Users should be able to update or delete their profile data. Nutrition
targets should be user-controlled and presented as informational tools,
not medical prescriptions.

### 4.7 Cross-platform experience

The web app and mobile apps should use the same account and backend.

-   Web: browse, import, edit, and organize recipes; review nutrition;
    manage the food diary.
-   Mobile: share recipes into the app, capture screenshots, cook from
    step-by-step instructions, and log meals quickly.
-   Synchronization: changes should appear across devices after saving,
    with clear handling for offline edits and conflicts in a later
    release.

------------------------------------------------------------------------

## 5. Key user journeys

### Journey A: Import and save a recipe

1.  User pastes a URL, shares a post, uploads an image/video, or enters
    a recipe manually.
2.  App identifies the source and attempts extraction using the
    appropriate method.
3.  AI structures the recipe into title, servings, ingredients,
    quantities, units, and instructions.
4.  App shows an editable review screen and highlights uncertain fields.
5.  User confirms the recipe.
6.  App calculates estimated nutrition and saves the original recipe to
    the user's library.

### Journey B: Adapt a recipe

1.  User opens a saved recipe.
2.  User selects one or more goals or restrictions.
3.  AI evaluates ingredients and suggests substitutions.
4.  User reviews the reason, quantity, nutrition impact, and cooking
    trade-offs for each suggestion.
5.  User accepts, rejects, or edits substitutions.
6.  App recalculates nutrition and displays a side-by-side comparison.
7.  User saves the adapted version without overwriting the original.

### Journey C: Log a meal

1.  User opens a saved recipe and selects **Log meal**.
2.  User chooses the date, meal category, and portion size.
3.  App calculates the nutrition for the amount eaten.
4.  The food diary updates the day's totals.
5.  User can view the meal in their history and edit it later.

### Journey D: Track a full day

1.  User opens the daily dashboard.
2.  User sees meals logged for the day and totals for calories and all
    supported nutrients.
3.  User adds recipes, individual foods, or snacks.
4.  Totals update automatically.
5.  User can navigate to prior days and review eating history.

------------------------------------------------------------------------

## 6. MVP scope

Because this is a personal project, the recommended approach is to build
a dependable end-to-end MVP before attempting every advanced import and
AI capability.

### MVP: build first

-   Account creation, login, and profile.
-   Responsive web application.
-   Cross-platform-ready backend and data model.
-   Manual recipe entry.
-   Recipe import from standard recipe URLs where accessible.
-   Screenshot/photo upload and text extraction.
-   Editable recipe review screen.
-   Recipe library with search and favorites.
-   User-selected dietary goals and restrictions.
-   AI substitution suggestions with user approval.
-   Nutrition calculation for original and adapted recipes.
-   Side-by-side nutrition comparison.
-   Daily food diary for recipes and individual foods.
-   Serving-size adjustment and daily totals.
-   Basic mobile-friendly experience.

### Next release

-   Native iOS and Android apps.
-   Share-sheet integration.
-   More robust social-media URL handling.
-   Video transcription and frame analysis where permitted.
-   Better ingredient normalization and substitution knowledge.
-   Recipe tags, notes, ratings, and advanced filters.
-   Barcode or packaged-food lookup, if supported by a suitable data
    provider.
-   Offline recipe viewing and improved synchronization.

### Later possibilities

-   Weekly meal planning.
-   Grocery lists generated from recipes.
-   Pantry inventory.
-   Recipe recommendations based on goals and saved preferences.
-   Household or shared recipe collections.
-   Wearable or health-platform integrations, with explicit user
    consent.
-   Optional reminders to plan meals or log food.

------------------------------------------------------------------------

## 7. Functional requirements

  -----------------------------------------------------------------------
  Area                    Requirement             Priority
  ----------------------- ----------------------- -----------------------
  Accounts                Secure registration,    MVP
                          login, and profile      
                          management              

  Import                  URL, photo/screenshot,  MVP
                          and manual recipe       
                          import                  

  Import                  Social share-sheet and  Next
                          video interpretation    

  Recipes                 Editable ingredients,   MVP
                          instructions, and       
                          servings                

  Library                 Save, search, favorite, MVP
                          and organize recipes    

  Personalization         Store goals, dietary    MVP
                          preferences, and        
                          allergies               

  Substitutions           AI recommendations with MVP
                          explanations and user   
                          approval                

  Nutrition               Calculate all required  MVP
                          nutrients per serving   
                          and recipe              

  Comparison              Compare original and    MVP
                          adapted recipe          
                          nutrition               

  Food diary              Log recipes and         MVP
                          individual foods by     
                          date and meal           

  Tracking                Daily totals and        MVP
                          historical logs         

  Mobile                  Native iOS and Android  Next
                          applications            

  Planning                Meal plans and grocery  Later
                          lists                   
  -----------------------------------------------------------------------

### Important behavior rules

-   Importing a recipe must not automatically create a food diary entry.
-   Changing a recipe must not overwrite the original.
-   Nutrition must be recalculated whenever ingredients, quantities, or
    serving counts change.
-   Food diary entries should reference the recipe version used at the
    time of logging, so later recipe edits do not silently rewrite
    historical intake.
-   Allergens should be treated as a safety constraint, not merely a
    nutrition preference.
-   The app should ask for clarification when an ingredient, quantity,
    unit, or serving size cannot be reliably interpreted.

------------------------------------------------------------------------

## 8. Nutrition and substitution approach

### 8.1 Ingredient normalization

Nutrition calculations depend on converting recipe text into structured
ingredients.

For example:

`1/2 cup unsalted butter`

should be represented with fields such as:

-   Ingredient: butter
-   Quantity: 0.5
-   Unit: cup
-   Preparation/state: unsalted
-   Normalized ingredient identifier: provider or internal food ID
-   Estimated weight in grams: based on an appropriate conversion

The app should retain the original text alongside normalized values.
Unit conversions must account for ingredient density; a cup of flour
does not weigh the same as a cup of oil.

### 8.2 Nutrition calculation

A nutrition service should:

1.  Parse each ingredient and quantity.
2.  Match it to a trusted food-composition database.
3.  Convert the amount to a standard mass or volume.
4.  Calculate nutrient totals for each ingredient.
5.  Sum ingredient values for the full recipe.
6.  Divide by the confirmed number of servings.
7.  Recalculate when quantities or substitutions change.

The app should identify missing matches and uncertain estimates rather
than presenting false precision. Nutrition values are estimates and can
vary by brand, preparation, and measurement method.

### 8.3 Substitution evaluation

Substitution recommendations should use two separate evaluations:

**A. Goal fit** - Does the substitute address the user's selected
goal? - Does it avoid the user's declared allergens or excluded
ingredients? - How do calories and each requested nutrient change?

**B. Recipe functionality** - Does it perform the same role in the
recipe? - Is the ratio appropriate? - Could it change moisture, binding,
rise, browning, crispness, or structure? - Does it require a change in
temperature or cooking time? - Is the flavor likely to be noticeable?

The app should avoid implying that a substitution is universally
healthier. For example, coconut oil may be a workable butter substitute
in some recipes, but it is high in saturated fat. Whether it is a useful
swap depends on the user's goals and the recipe.

### 8.4 Nutrition data sources

Evaluate a reputable food-composition source such as USDA FoodData
Central and/or a licensed nutrition API. Confirm API terms, attribution
requirements, rate limits, coverage, and commercial-use rights before
choosing a provider.

Keep the nutrition provider behind an internal service interface so it
can be replaced without rewriting the rest of the app.

------------------------------------------------------------------------

## 9. AI and recipe-import approach

AI should interpret and explain information, while deterministic
application logic should handle calculations wherever possible.

### 9.1 Recipe extraction pipeline

A proposed pipeline:

1.  **Input detection:** Identify whether the user supplied a URL,
    image, screenshot, video, or text.
2.  **Content retrieval:** Use permitted page metadata, structured
    recipe data (such as Schema.org Recipe), accessible captions, or
    user-provided media.
3.  **OCR/transcription:** Extract visible text from images and video
    frames; transcribe speech when accessible and appropriate.
4.  **AI structuring:** Convert source material into a structured recipe
    object.
5.  **Validation:** Check required fields, ingredient quantities, units,
    and instruction consistency.
6.  **User review:** Ask the user to correct uncertain fields.
7.  **Nutrition calculation:** Match normalized ingredients to nutrition
    data and calculate totals.
8.  **Save:** Store the confirmed recipe and source attribution.

### 9.2 AI substitution workflow

Provide the model with:

-   Original recipe and structured ingredients.
-   Recipe category and cooking method.
-   User-selected goals and restrictions.
-   Allergens and excluded ingredients.
-   Available ingredient and substitution knowledge.
-   Nutrition data for candidate ingredients, where available.

Require structured output containing:

-   Ingredient being replaced.
-   Proposed replacement.
-   Original and replacement quantities.
-   Substitution ratio.
-   Reason for recommendation.
-   Expected nutrition impact.
-   Expected flavor/texture/function impact.
-   Warnings, uncertainty, and confidence.

The backend should validate the model's output, verify ingredient
constraints, and calculate nutrition independently. The model must not
invent nutrition figures or make unsupported allergy-safety assurances.

### 9.3 AI boundaries

-   AI suggestions are recommendations, not guarantees of recipe
    success.
-   Never silently override a declared allergy or dietary restriction.
-   For severe allergies, warn users that ingredient labels,
    cross-contact, and manufacturing practices must be checked
    independently.
-   If the source content cannot be accessed, ask the user to upload
    screenshots, paste the caption, or enter the recipe.
-   Do not circumvent paywalls, authentication, platform restrictions,
    or copyright controls.

------------------------------------------------------------------------

## 10. Suggested technical architecture

The architecture should support a shared backend for web and mobile,
with clear separation between user interfaces, application logic, AI
services, and nutrition data.

### Suggested stack

  -----------------------------------------------------------------------
  Layer                   Suggested technology    Reason
  ----------------------- ----------------------- -----------------------
  Web frontend            Next.js + React +       Responsive web app and
                          TypeScript              reusable UI

  Mobile frontend         React Native + Expo +   iOS and Android from a
                          TypeScript              shared codebase

  Backend/API             TypeScript with NestJS  Typed application
                          or Next.js API routes   services and API
                          initially               endpoints

  Database                PostgreSQL              Relational data for
                                                  users, recipes,
                                                  ingredients, and logs

  Authentication          Supabase Auth or        Secure account
                          another managed auth    management
                          provider                

  Database hosting        Supabase or managed     Database, migrations,
                          PostgreSQL              and access controls

  File storage            Supabase Storage or     Recipe screenshots and
                          equivalent              user media

  AI                      Model API behind a      Recipe extraction and
                          server-side service     substitution reasoning

  Nutrition               USDA FoodData Central   Ingredient-level
                          or licensed nutrition   nutrition information
                          API                     

  OCR/transcription       OCR and speech-to-text  Text extraction from
                          services as needed      images and videos

  Hosting                 Vercel for web; managed Straightforward
                          backend hosting as      deployment
                          needed                  
  -----------------------------------------------------------------------

These are recommendations, not mandatory choices. A simpler initial
implementation is preferable to maintaining unnecessary infrastructure.

### High-level architecture

``` text
       WEB APP (Next.js)          MOBILE APP (React Native)
               |                           |
               +------------+--------------+
                            |
                         API Layer
                            |
       +--------------------+----------------------+
       |                    |                      |
  User/Profile         Recipe Service          Food Diary
       |                    |                      |
       +--------------------+----------------------+
                            |
                  PostgreSQL Database
                            |
       +--------------------+----------------------+
       |                    |                      |
  AI Service          Nutrition Service       Media Storage
       |                    |                      |
  Extraction &        Food composition        Images/video
  substitutions       and calculations        uploads
```

### Suggested backend modules

-   **Auth/Profile:** accounts, preferences, goals, and user settings.
-   **Recipe Import:** URL handling, OCR, transcription, and extraction.
-   **Recipe Management:** original recipes, versions, ingredients, and
    instructions.
-   **Substitution Engine:** candidate substitutions, AI explanations,
    and validation.
-   **Nutrition Engine:** ingredient matching, unit conversions, and
    nutrient totals.
-   **Food Diary:** meal entries, portions, dates, and daily summaries.
-   **Media:** secure uploads and storage.
-   **Sync/API:** consistent access for web and mobile clients.

### Suggested API endpoints

The following are illustrative REST endpoints; the final API design can
change.

  ------------------------------------------------------------------------------
  Method                  Endpoint                       Purpose
  ----------------------- ------------------------------ -----------------------
  POST                    `/auth/register`               Create an account

  GET                     `/me`                          Retrieve current user
                                                         profile

  PATCH                   `/me/preferences`              Update goals and
                                                         dietary preferences

  POST                    `/recipes/import`              Start a URL or media
                                                         import

  POST                    `/recipes`                     Create a recipe
                                                         manually

  GET                     `/recipes`                     List/search saved
                                                         recipes

  GET                     `/recipes/:id`                 Retrieve recipe details

  PATCH                   `/recipes/:id`                 Update editable recipe
                                                         fields

  POST                    `/recipes/:id/substitutions`   Request substitution
                                                         suggestions

  POST                    `/recipes/:id/versions`        Save an adapted recipe
                                                         version

  GET                     `/recipes/:id/nutrition`       Retrieve nutrition
                                                         estimates

  POST                    `/food-logs`                   Log a meal or food

  GET                     `/food-logs/daily`             Retrieve a day's
                                                         entries and totals

  PATCH                   `/food-logs/:id`               Edit a food diary entry

  DELETE                  `/food-logs/:id`               Delete a food diary
                                                         entry
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

## 11. Data model

A relational database is a good fit. The following entities represent a
starting point; implementation details and field types should be
finalized during development.

### Core entities

**User** - `id` - `email` - `display_name` - `created_at`

**UserPreference** - `id` - `user_id` - `dietary_preferences` -
`allergens` - `excluded_ingredients` - `nutrition_goals` -
`daily_targets` - `preferred_units`

**Recipe** - `id` - `user_id` - `title` - `description` - `source_url` -
`source_name` - `source_attribution` - `servings` - `instructions` -
`created_at` - `updated_at`

**RecipeVersion** - `id` - `recipe_id` - `version_name` -
`is_original` - `parent_version_id` - `servings` - `created_at`

**RecipeIngredient** - `id` - `recipe_version_id` - `ingredient_name` -
`normalized_food_id` - `quantity` - `unit` - `quantity_grams` -
`preparation_notes` - `is_optional`

**Substitution** - `id` - `recipe_version_id` -
`original_ingredient_id` - `replacement_ingredient` -
`replacement_quantity` - `replacement_unit` - `user_goal` -
`explanation` - `functionality_notes` - `status`

**NutritionEstimate** - `id` - `recipe_version_id` - `data_source` -
`calories` - `protein_g` - `carbohydrates_g` - `fat_g` -
`saturated_fat_g` - `fiber_g` - `sugar_g` - `sodium_mg` -
`per_serving` - `calculated_at` - `estimate_quality_notes`

**FoodLogEntry** - `id` - `user_id` - `recipe_version_id` (nullable) -
`food_name` - `meal_type` - `quantity` - `unit` - `log_date` -
`logged_at` - `notes` - `nutrition_snapshot`

The nutrition snapshot preserves the values used when the user logged
the food, even if the recipe changes later.

**RecipeMedia** - `id` - `recipe_id` - `storage_path` - `media_type` -
`created_at`

### Data relationships

-   One user has many recipes and food log entries.
-   One recipe can have multiple recipe versions.
-   Each recipe version has multiple ingredients and one or more
    nutrition estimates.
-   A recipe version can have many substitution records.
-   A food log entry can reference a specific recipe version or
    represent an individual food.
-   User preferences belong to a user and are applied when generating
    substitution suggestions.

### Data design notes

-   Store timestamps consistently and display them in the user's local
    timezone.
-   Store quantities and normalized units separately from the original
    ingredient text.
-   Use database-level access policies so users can only access their
    own private records.
-   Keep historical food-log nutrition values stable.
-   Avoid storing uploaded video longer than necessary; define retention
    and deletion rules.

------------------------------------------------------------------------

## 12. Privacy, safety, and content considerations

RecipeWise may store dietary preferences, allergy information, food
logs, and personal nutrition goals. Treat this information as sensitive.

-   Use secure authentication and authorization.
-   Restrict database access by user identity.
-   Encrypt data in transit and use appropriate encryption at rest.
-   Do not expose AI or nutrition-provider API keys in frontend code.
-   Request only the permissions needed for a feature.
-   Explain what media is uploaded and how it is processed.
-   Provide account and data deletion controls.
-   Establish retention rules for screenshots, photos, and video
    uploads.
-   Do not sell or share personal food logs for advertising without
    clear, informed consent.
-   Avoid medical claims, diagnosis, or treatment recommendations.
-   Make it clear that nutrition calculations are estimates, not medical
    advice.
-   Treat allergy handling conservatively and encourage users to verify
    packaging and cross-contact information.
-   Follow platform terms, copyright rules, and applicable privacy laws
    when importing, storing, or displaying third-party recipe content.

------------------------------------------------------------------------

## 13. Testing and quality assurance

### Recipe import tests

-   Valid recipe page with structured recipe metadata.
-   Page with incomplete or missing recipe metadata.
-   Instagram/social link with accessible caption.
-   Inaccessible, private, or login-gated post.
-   Screenshot with clear text and screenshot with poor image quality.
-   Video with captions, spoken instructions, and on-screen ingredient
    lists.
-   Ambiguous ingredient quantity or unit.
-   User edits extracted content before saving.

### Substitution tests

-   Butter-to-oil substitution in different baking recipes.
-   Dairy-free substitution where dairy is an allergen.
-   Gluten-free substitution in recipes where structure is important.
-   Lower-sugar substitution in baked goods.
-   Higher-protein substitution in savory meals.
-   Multiple goals that may conflict.
-   Rejection of a suggestion and preservation of the original recipe.
-   Verification that a declared allergen is not recommended as a
    replacement.

### Nutrition tests

-   Correct scaling when servings change.
-   Correct unit conversion for ingredients with different densities.
-   Nutrition recalculation after ingredient changes.
-   Missing nutrition data and uncertain ingredient matches.
-   Comparison between original and adapted versions.
-   Correct portion scaling when a user logs half a serving or multiple
    servings.

### Food diary tests

-   Logging a recipe does not change the saved recipe.
-   Importing a recipe does not automatically log a meal.
-   Daily totals update after adding, editing, or deleting an entry.
-   Historical logs preserve their original nutrition snapshot.
-   Date and timezone boundaries behave correctly.
-   Web and mobile show consistent account data.

------------------------------------------------------------------------

## 14. Development roadmap

### Phase 1 --- Foundation

-   Finalize product name and basic visual identity.
-   Set up repository, development environment, and deployment.
-   Create database schema and authentication.
-   Build user profile and preference settings.
-   Build responsive app navigation and core screens.

### Phase 2 --- Recipe library

-   Implement manual recipe creation.
-   Implement supported URL import.
-   Add screenshot upload and OCR.
-   Build editable extraction review.
-   Save, search, favorite, and view recipes.

### Phase 3 --- Nutrition engine

-   Select and integrate a nutrition data provider.
-   Normalize ingredients and units.
-   Calculate recipe and per-serving nutrition.
-   Build original-versus-adapted nutrition displays.
-   Add uncertainty and missing-data handling.

### Phase 4 --- AI substitutions

-   Build goal and restriction selection.
-   Implement AI substitution suggestions.
-   Add cooking-function and flavor explanations.
-   Validate allergy constraints and structured outputs.
-   Save recipe versions and recalculate nutrition.

### Phase 5 --- Food diary

-   Add recipe and individual-food logging.
-   Implement meal categories and serving sizes.
-   Build daily nutrient summaries.
-   Add history and editing.
-   Preserve nutrition snapshots for historical entries.

### Phase 6 --- Mobile and advanced import

-   Build iOS and Android clients with shared backend services.
-   Add share-sheet integration.
-   Improve social content import.
-   Add video frame and caption/speech interpretation where permitted.
-   Test cross-device synchronization.

### Phase 7 --- Polish

-   Improve onboarding and accessibility.
-   Add robust error handling and loading states.
-   Conduct security and privacy review.
-   Test with real recipes and varied dietary goals.
-   Fix usability issues before adding more features.

------------------------------------------------------------------------

## 15. Success measures

For a personal-project MVP, focus on whether the core workflow is
reliable and useful.

-   **Import success:** Percentage of attempted imports that produce a
    reviewable recipe.
-   **Extraction quality:** Percentage of ingredient quantities and
    instructions users accept without edits.
-   **Substitution usefulness:** Percentage of AI suggestions users
    accept.
-   **Nutrition completeness:** Percentage of recipes with usable
    estimates for all requested nutrients.
-   **Logging friction:** Time and number of steps required to log a
    meal.
-   **Data reliability:** Accuracy of serving scaling, nutrient totals,
    and daily summaries.
-   **Cross-platform consistency:** Whether recipe changes and food logs
    synchronize correctly.
-   **Repeat use:** Whether users return to save recipes, adapt them,
    and log meals.

Do not optimize for the number of recipes imported at the expense of
accuracy, transparency, or user trust.

------------------------------------------------------------------------

## 16. Open product decisions

These decisions can be made during implementation rather than blocking
the initial build:

1.  **Product name and branding:** RecipeWise is a working title only.
2.  **Nutrition provider:** Compare data quality, cost, API limits,
    attribution, and licensing.
3.  **AI provider:** Choose a model and define cost, latency, privacy,
    and structured-output requirements.
4.  **Platform sequence:** Build a responsive web MVP first, then native
    mobile apps using the same backend.
5.  **Daily targets:** Let users enter their own targets initially;
    consider optional guided setup later.
6.  **Food database coverage:** Decide how to support branded packaged
    foods in addition to raw ingredients.
7.  **Video processing:** Determine which platforms and formats can be
    handled within their terms and technical limits.
8.  **Offline access:** Start with online-first behavior; add offline
    cooking access and sync after the core experience works.

------------------------------------------------------------------------

## Recommended first build

Start with one complete, reliable user flow:

**Create an account → add a recipe → review the extracted ingredients →
choose a nutrition goal → accept a substitution → compare nutrition →
save the adapted version → log a serving → see updated daily totals.**

If that flow feels simple, accurate, and useful on the web, the product
has a strong foundation for mobile expansion.
