import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const BOARD_SIZE = 20;
const CELL_SIZE = (width - 48) / BOARD_SIZE;

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: Position;
  nextDirection: Position;
  isPlaying: boolean;
  score: number;
  highScore: number;
  gameOver: boolean;
}

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export default function MiniGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 5, y: 5 },
    direction: DIRECTIONS.UP,
    nextDirection: DIRECTIONS.UP,
    isPlaying: false,
    score: 0,
    highScore: 0,
    gameOver: false,
  });

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const newFood = generateFood(INITIAL_SNAKE);
    setGameState(prev => ({
      ...prev,
      snake: [...INITIAL_SNAKE],
      food: newFood,
      direction: DIRECTIONS.UP,
      nextDirection: DIRECTIONS.UP,
      isPlaying: false,
      score: 0,
      gameOver: false,
    }));
  }, [generateFood]);

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.gameOver) return prev;

      // Use nextDirection for the actual movement
      const currentDirection = prev.nextDirection;
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };
      
      head.x += currentDirection.x;
      head.y += currentDirection.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        return {
          ...prev,
          isPlaying: false,
          gameOver: true,
          highScore: Math.max(prev.score, prev.highScore),
        };
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return {
          ...prev,
          isPlaying: false,
          gameOver: true,
          highScore: Math.max(prev.score, prev.highScore),
        };
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === prev.food.x && head.y === prev.food.y) {
        const newFood = generateFood(newSnake);
        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: prev.score + 10,
          direction: currentDirection,
        };
      } else {
        newSnake.pop();
        return {
          ...prev,
          snake: newSnake,
          direction: currentDirection,
        };
      }
    });
  }, [generateFood]);

  // Game loop effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      gameLoopRef.current = setInterval(moveSnake, 200);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }
  }, [gameState.isPlaying, gameState.gameOver, moveSnake]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  const handleDirectionChange = (newDirection: Position) => {
    setGameState(prev => {
      // Prevent reversing into itself
      const currentDirection = prev.direction;
      if (
        (newDirection.x === -currentDirection.x && newDirection.y === -currentDirection.y) ||
        !prev.isPlaying ||
        prev.gameOver
      ) {
        return prev;
      }
      
      // Set the next direction to be applied on the next game loop
      return { ...prev, nextDirection: newDirection };
    });
  };

  const toggleGame = () => {
    if (gameState.gameOver) {
      resetGame();
    } else {
      setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = gameState.snake[0]?.x === x && gameState.snake[0]?.y === y;
    const isSnakeBody = gameState.snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = gameState.food.x === x && gameState.food.y === y;

    let cellStyle = styles.cell;
    if (isSnakeHead) {
      cellStyle = [styles.cell, styles.snakeHead];
    } else if (isSnakeBody) {
      cellStyle = [styles.cell, styles.snakeBody];
    } else if (isFood) {
      cellStyle = [styles.cell, styles.food];
    }

    return <View key={`${x}-${y}`} style={cellStyle} />;
  };

  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      const row = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        row.push(renderCell(x, y));
      }
      board.push(
        <View key={y} style={styles.row}>
          {row}
        </View>
      );
    }
    return board;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ECFDF5', '#F0FDF4']}
        style={styles.header}
      >
        <Text style={styles.headerSubtitle}>Play while you wait!</Text>
        
        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Trophy color="#059669" size={20} />
            <Text style={styles.scoreNumber}>{gameState.score}</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreItem}>
            <Text style={styles.scoreNumber}>{gameState.highScore}</Text>
            <Text style={styles.scoreLabel}>Best</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.gameContainer}>
        <View style={styles.gameBoard}>
          {renderBoard()}
          
          {gameState.gameOver && (
            <View style={styles.gameOverOverlay}>
              <View style={styles.gameOverCard}>
                <Text style={styles.gameOverTitle}>Game Over!</Text>
                <Text style={styles.gameOverScore}>Score: {gameState.score}</Text>
                {gameState.score === gameState.highScore && gameState.score > 0 && (
                  <Text style={styles.newRecord}>🎉 New Record!</Text>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={styles.controls}>
          <View style={styles.gameControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.playButton]}
              onPress={toggleGame}
            >
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.buttonGradient}
              >
                {gameState.gameOver ? (
                  <RotateCcw color="#FFFFFF" size={20} />
                ) : gameState.isPlaying ? (
                  <Pause color="#FFFFFF" size={20} />
                ) : (
                  <Play color="#FFFFFF" size={20} />
                )}
                <Text style={styles.controlButtonText}>
                  {gameState.gameOver ? 'Restart' : gameState.isPlaying ? 'Pause' : 'Play'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.directionControls}>
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={[
                  styles.directionButton,
                  gameState.nextDirection === DIRECTIONS.UP && styles.directionButtonActive
                ]}
                onPress={() => handleDirectionChange(DIRECTIONS.UP)}
                disabled={!gameState.isPlaying}
              >
                <ArrowUp 
                  color={gameState.nextDirection === DIRECTIONS.UP ? "#FFFFFF" : "#059669"} 
                  size={24} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={[
                  styles.directionButton,
                  gameState.nextDirection === DIRECTIONS.LEFT && styles.directionButtonActive
                ]}
                onPress={() => handleDirectionChange(DIRECTIONS.LEFT)}
                disabled={!gameState.isPlaying}
              >
                <ArrowLeft 
                  color={gameState.nextDirection === DIRECTIONS.LEFT ? "#FFFFFF" : "#059669"} 
                  size={24} 
                />
              </TouchableOpacity>
              <View style={styles.directionSpacer} />
              <TouchableOpacity
                style={[
                  styles.directionButton,
                  gameState.nextDirection === DIRECTIONS.RIGHT && styles.directionButtonActive
                ]}
                onPress={() => handleDirectionChange(DIRECTIONS.RIGHT)}
                disabled={!gameState.isPlaying}
              >
                <ArrowRight 
                  color={gameState.nextDirection === DIRECTIONS.RIGHT ? "#FFFFFF" : "#059669"} 
                  size={24} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.directionRow}>
              <TouchableOpacity
                style={[
                  styles.directionButton,
                  gameState.nextDirection === DIRECTIONS.DOWN && styles.directionButtonActive
                ]}
                onPress={() => handleDirectionChange(DIRECTIONS.DOWN)}
                disabled={!gameState.isPlaying}
              >
                <ArrowDown 
                  color={gameState.nextDirection === DIRECTIONS.DOWN ? "#FFFFFF" : "#059669"} 
                  size={24} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How to Play</Text>
          <Text style={styles.instructionsText}>
            • Press Play to start the game
          </Text>
          <Text style={styles.instructionsText}>
            • Use the arrow buttons to control the snake
          </Text>
          <Text style={styles.instructionsText}>
            • Eat the green food to grow and score points
          </Text>
          <Text style={styles.instructionsText}>
            • Don't hit the walls or yourself!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 2,
  },
  scoreDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  gameContainer: {
    flex: 1,
    padding: 24,
  },
  gameBoard: {
    width: BOARD_SIZE * CELL_SIZE,
    height: BOARD_SIZE * CELL_SIZE,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'transparent',
  },
  snakeHead: {
    backgroundColor: '#047857',
    borderRadius: 2,
  },
  snakeBody: {
    backgroundColor: '#059669',
    borderRadius: 1,
  },
  food: {
    backgroundColor: '#10B981',
    borderRadius: CELL_SIZE / 2,
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  gameOverTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  gameOverScore: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  newRecord: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  controls: {
    marginTop: 24,
    alignItems: 'center',
  },
  gameControls: {
    marginBottom: 24,
  },
  controlButton: {
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 120,
  },
  playButton: {
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  directionControls: {
    alignItems: 'center',
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  directionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  directionButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#047857',
  },
  directionSpacer: {
    width: 56,
    height: 56,
    marginHorizontal: 8,
  },
  instructions: {
    marginTop: 32,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 6,
    lineHeight: 20,
  },
});