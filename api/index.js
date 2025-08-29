const express = require('express');
const cors = require('cors');

// Configuration constants
const CONFIG = {
    USER_INFO: {
        fullName: "miit_daga",
        birthDate: "27082003",
        email: "miit.daga2022@vitstudent.ac.in",
        rollNumber: "22BIT0084"
    }
};

// Create Express app and a router
const app = express();
const apiRouter = express.Router();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Input validation middleware
const validateInput = (req, res, next) => {
    try {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({
                is_success: false,
                error: "Missing 'data' field in request body"
            });
        }

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "'data' field must be an array"
            });
        }

        next();
    } catch (error) {
        return res.status(400).json({
            is_success: false,
            error: "Invalid JSON format"
        });
    }
};

// Utility functions for data processing
const DataProcessor = {

    // Check if a string represents a valid number
    isNumber: (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str)) && str.trim() !== '';
    },

    //Check if a character is alphabetic
    isAlphabet: (char) => {
        return /^[a-zA-Z]+$/.test(char);
    },

    // Check if a character is a special character (not alphanumeric)
    isSpecialCharacter: (char) => {
        return !/^[a-zA-Z0-9]+$/.test(char);
    },

    // Process the input array and categorize elements
    processData: (inputArray) => {
        const result = {
            oddNumbers: [],
            evenNumbers: [],
            alphabets: [],
            specialCharacters: [],
            allAlphabets: [] // For concatenation logic
        };

        inputArray.forEach(item => {
            const itemStr = String(item);

            if (DataProcessor.isNumber(itemStr)) {
                const num = parseInt(itemStr);
                if (num % 2 === 0) {
                    result.evenNumbers.push(itemStr);
                } else {
                    result.oddNumbers.push(itemStr);
                }
            } else if (DataProcessor.isAlphabet(itemStr)) {
                result.alphabets.push(itemStr.toUpperCase());
                result.allAlphabets.push(...itemStr.split(''));
            } else if (DataProcessor.isSpecialCharacter(itemStr)) {
                result.specialCharacters.push(itemStr);
            }
        });

        return result;
    },

    // Calculate sum of all numbers in the input array
    calculateSum: (inputArray) => {
        return inputArray
            .filter(item => DataProcessor.isNumber(String(item)))
            .reduce((sum, item) => sum + parseInt(String(item)), 0);
    },



    // Create concatenated string from alphabets in reverse order with alternating caps
    createConcatString: (alphabets) => {
        if (alphabets.length === 0) return "";

        // Get all alphabetic characters and reverse the order
        const reversedAlphabets = alphabets.reverse();

        // Apply alternating caps (first char uppercase, second lowercase, etc.)
        return reversedAlphabets
            .map((char, index) => {
                return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
            })
            .join('');
    }
};

// Main BFHL endpoint
apiRouter.post('/bfhl', validateInput, (req, res) => {
    try {
        const { data } = req.body;

        // Process the input data
        const processedData = DataProcessor.processData(data);

        // Calculate sum
        const sum = DataProcessor.calculateSum(data);

        // Create concatenated string
        const concatString = DataProcessor.createConcatString([...processedData.allAlphabets]);

        // Build response object
        const response = {
            is_success: true,
            user_id: `${CONFIG.USER_INFO.fullName}_${CONFIG.USER_INFO.birthDate}`,
            email: CONFIG.USER_INFO.email,
            roll_number: CONFIG.USER_INFO.rollNumber,
            odd_numbers: processedData.oddNumbers,
            even_numbers: processedData.evenNumbers,
            alphabets: processedData.alphabets,
            special_characters: processedData.specialCharacters,
            sum: String(sum),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET endpoint for testing API availability
apiRouter.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1,
        message: "BFHL API is running successfully"
    });
});

// Health check endpoint
apiRouter.get('/health', (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "BFHL API"
    });
});

// Mount the router on the /api path
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        is_success: false,
        error: "Internal server error"
    });
});

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

// Export for Vercel
module.exports = app;