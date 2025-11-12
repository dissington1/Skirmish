let skirmishRoll = null;
let skirmishAnimTimer = 0;
let skirmishState = 'zipping'; // 'zipping', 'stopped'
let skirmishFinalArrowPos = 0;
let skirmishResult = "";
let skirmishAnimTotalTime = 120; // Changed to 120 frames for clearer segments

function skirmishHud() {
    attackingTile = findAttackingTile(defendingTile);
    attackingWall = attackingTile.walls[getDirectionFrom(attackingTile, defendingTile)];
    defendingWall = defendingTile.walls[getDirectionFrom(defendingTile, attackingTile)];

    let attackPower = attackingTile.att + attackingWall.attBonus;
    let defendPower = defendingTile.def + defendingWall.defBonus;
    selectedTile = null;

    playerHud.pane.hidden = true;
    tileHud.pane.hidden = true;

    cam.x = defendingTile.x;
    cam.y = defendingTile.y;
    cam.zoom = 1.5;
    
    push(); 
    
    resetMatrix();

    const attacker = attackingTile.occupant;
    const defender = defendingTile.occupant;

    const hudHeight = 70;
    const padding = 20;

    const hudY = height - hudHeight;
    
    const barWidth = width * 0.4; // 40% of screen width
    const barHeight = 25;
    
    const barX = (width / 2) - (barWidth / 2); // Center horizontally
    const barY = hudY + (hudHeight / 2) - (barHeight / 2); // Center vertically
    
    const attackSuccessChance = attackPower / (attackPower + defendPower);
    const defendSuccessChance = 1.0 - attackSuccessChance;
    // console.log("Attack Success Chance", attackSuccessChance);

    // --- 1. Initialize Skirmish Animation (Runs Once) ---
    if (skirmishRoll === null) {
        skirmishRoll = random(1); // The one-time random roll
        skirmishAnimTimer = skirmishAnimTotalTime; // Start timer
        skirmishState = 'zipping';
        // Calculate the final stopping position based on the roll
        skirmishFinalArrowPos = barX + (barWidth * skirmishRoll);
        skirmishResult = "";
    }

    // --- 2. Render HUD Background ---
    fill(0, 0, 0, 200);
    noStroke(); 
    rect(0, hudY, width, hudHeight);

    // --- 3. Render Probability Bar ---
    
    // Bar Background
    fill(50);
    noStroke();
    rect(barX, barY, barWidth, barHeight); 

    // Attacker Segment
    fill(attacker.colour);
    rect(barX, barY, barWidth * attackSuccessChance, barHeight); 

    // Defender Segment
    fill(defender.colour);
    const playerBStartX = barX + (barWidth * attackSuccessChance);
    const playerBWidth = barWidth * (1 - attackSuccessChance);
    rect(playerBStartX, barY, playerBWidth, barHeight);

    // Bar Outline
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(barX, barY, barWidth, barHeight);

    // --- 4. Render Text Details (On Top) ---
    
    // Common text settings
    const textY = hudY + 4;   // 4px padding from the top of the HUD
    const lineHeight = 13;  // Tight line height to fit
    const nameSize = 14;
    const detailSize = 12;

    noStroke();

    // Attacker Details (Left Side)
    let currentY = textY;
    textAlign(LEFT, TOP);
    fill(attacker.colour);
    textSize(nameSize);
    textStyle(BOLD);
    text(attacker.name, padding, currentY);
    currentY += 14; 
    textStyle(NORMAL);
    fill(255);
    textSize(detailSize);
    text("Tile Attack: " + attackingTile.att, padding, currentY);
    currentY += lineHeight;
    text("Wall Attack: " + attackingWall.attBonus, padding, currentY);
    currentY += lineHeight;
    textStyle(BOLD);
    text("Total Attack: " + attackPower, padding, currentY);
    currentY += lineHeight;
    fill(attacker.colour); 
    text("Success Chance: " + nfc(attackSuccessChance * 100, 0) + "%", padding, currentY);
    textStyle(NORMAL);


    // Defender Details (Right Side)
    currentY = textY; // Reset Y
    textAlign(RIGHT, TOP);
    fill(defender.colour);
    textSize(nameSize);
    textStyle(BOLD);
    text(defender.name, width - padding, currentY);
    currentY += 14;
    textStyle(NORMAL);
    fill(255);
    textSize(detailSize);
    text("Tile Defense: " + defendingTile.def, width - padding, currentY);
    currentY += lineHeight;
    text("Wall Defense: " + defendingWall.defBonus, width - padding, currentY);
    currentY += lineHeight;
    textStyle(BOLD);
    text("Total Defense: " + defendPower, width - padding, currentY);
    currentY += lineHeight;
    fill(defender.colour);
    text("Defense Chance: " + nfc(defendSuccessChance * 100, 0) + "%", width - padding, currentY);
    textStyle(NORMAL);

    // --- 5. Render Bar Icons & Percentages ---
    const iconY = barY + (barHeight / 2); // Vertical center of the bar
    const percentY = barY + barHeight + 18; // Below the bar
    const iconPadding = 35; // Space from bar
    const iconSize = 24;
    const percentSize = 14;

    textAlign(CENTER, CENTER);
    
    // Sword Icon & Attack %
    const swordX = barX - iconPadding;
    textSize(iconSize);
    text('⚔️', swordX, iconY); // Sword emoji
    textSize(percentSize);
    textStyle(BOLD);
    fill(attacker.colour); // Use attacker color
    text(nfc(attackSuccessChance * 100, 0) + "%", swordX, percentY);
    
    // Shield Icon & Defense %
    const shieldX = barX + barWidth + iconPadding;
    textSize(iconSize);
    text('🛡️', shieldX, iconY); // Shield emoji
    textSize(percentSize);
    textStyle(BOLD);
    fill(defender.colour); // Use defender color
    text(nfc(defendSuccessChance * 100, 0) + "%", shieldX, percentY);

    textStyle(NORMAL); // Reset text style


    // --- 6. Animation Logic & Arrow Rendering (MODIFIED) ---
    let currentArrowX;

    if (skirmishState === 'zipping') {
        
        let framesElapsed = skirmishAnimTotalTime - skirmishAnimTimer;
        
        const phaseDuration = 40; // 40 frames per phase (R, L, R, Stop)
        
        if (skirmishAnimTimer > phaseDuration) {
            // --- Phase 1 & 2: Constant Speed Ping-Pong Motion (Frames 120 down to 41) ---
            
            // Calculate progress within the entire ping-pong cycle (0 to 1)
            let pingPongTime = skirmishAnimTotalTime - phaseDuration;
            let cycleProgress = map(framesElapsed, 0, pingPongTime, 0, 1);
            
            // Map the cycle progress to the 4 segments (R, L, R, L)
            let segment = floor(cycleProgress * 4);
            let segmentProgress = (cycleProgress * 4) % 1; 

            if (segment % 2 === 0) {
                // Moving Right (0 to 1)
                currentArrowX = map(segmentProgress, 0, 1, barX, barX + barWidth);
            } else {
                // Moving Left (1 to 0)
                currentArrowX = map(segmentProgress, 0, 1, barX + barWidth, barX);
            }

        } else {
            // --- Phase 3: Final Movement & Stop (Frames 40 down to 1) ---
            
            // The arrow is at barX (the left edge) at the start of this phase.
            // It needs to travel to skirmishFinalArrowPos at a constant speed.
            
            // 1. Calculate the required Speed (pixels/frame). 
            // The previous segments covered barWidth in phaseDuration (40 frames).
            const speed = barWidth / phaseDuration; 
            
            // 2. Calculate the distance traveled *in this final phase*.
            let elapsedInPhase = phaseDuration - skirmishAnimTimer; // Goes from 0 to 39
            let distanceTraveled = elapsedInPhase * speed;
            
            // 3. Calculate the target distance from the starting point (barX).
            let targetDistance = skirmishFinalArrowPos - barX;
            
            // 4. Set the position based on constant speed, ensuring it stops exactly on the target.
            
            if (distanceTraveled >= targetDistance) {
                // Once the constant speed would take it past the target, snap to the target
                currentArrowX = skirmishFinalArrowPos;
            } else {
                // Travel at constant speed from the start point (barX)
                currentArrowX = barX + distanceTraveled;
            }
        }
        
        skirmishAnimTimer--;
        if (skirmishAnimTimer <= 0) {
            skirmishState = 'stopped';
            // Ensure the arrow lands exactly on the spot when stopped
            currentArrowX = skirmishFinalArrowPos; 
            
            // Now that the animation is over, determine the result
            if (skirmishRoll < attackSuccessChance) {
                skirmishResult = "SUCCESSFUL SKIRMISH!"; // Attacker wins
            } else {
                skirmishResult = "FAILED SKIRMISH!"; // Defender wins
            }
        }
    } else { // skirmishState === 'stopped'
        // Lock the arrow to its final calculated position
        currentArrowX = skirmishFinalArrowPos;
    }

    // Draw the arrow
    let arrowY = barY - 5; // 5px above the bar
    fill(255, 255, 0); // Bright yellow
    noStroke();
    // Draw a downward-pointing triangle
    triangle(
        currentArrowX, arrowY,       // Bottom point (on the bar)
        currentArrowX - 6, arrowY - 12, // Top-left
        currentArrowX + 6, arrowY - 12  // Top-right
    );

    // --- 7. Render Final Result Message ---
    if (skirmishState === 'stopped') {
        
        // Window dimensions
        const winWidth = 300;
        const winHeight = 120;
        const winX = (width - winWidth) / 2;
        const winY = (height - winHeight) / 2;
    
        // Draw semi-transparent background window
        fill(0, 0, 0, 220);
        stroke(255);
        strokeWeight(2);
        rect(winX, winY, winWidth, winHeight, 10); // Rounded corners
    
        // Result text
        textAlign(CENTER, CENTER);
        textSize(24);
        textStyle(BOLD);
        if (skirmishResult === "FAILED SKIRMISH!") {
            fill(255, 0, 0);
        } else {
            fill(0, 255, 0);
        }

        noStroke();

        text(skirmishResult, winX + winWidth / 2, winY + 40);
    
        // Button
        const buttonWidth = 120;
        const buttonHeight = 40;
        const buttonX = winX + (winWidth - buttonWidth) / 2;
        const buttonY = winY + 70;
    
        fill(50, 150, 255); // Button color
        stroke(255);
        strokeWeight(2);
        rect(buttonX, buttonY, buttonWidth, buttonHeight, 6);
    
        fill(255);
        textSize(16);
        textStyle(BOLD);
        noStroke();

        text("CONTINUE", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
    
        // Detect click on button
        if (mouseIsPressed &&
            mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            // Reset skirmish state to allow closing window
            skirmishState = 'ready'; // Or call any function to continue game
            skirmishRoll = null;
            // Additional cleanup if needed

            if (skirmishResult != "FAILED SKIRMISH!") {
                // Remove tile from defender
                const defender = defendingTile.occupant; // previous owner
                const index = defender.tiles.indexOf(defendingTile);
                if (index > -1) {
                    defender.tiles.splice(index, 1); // remove 1 element at the found index
                }
            
                // Assign tile to attacker
                defendingTile.occupant = player;
                player.tiles.push(defendingTile);
            }

            skirmishing = false;
        }
    }
    
    pop(); 
}